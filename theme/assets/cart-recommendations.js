/**
 * <cart-recommendations>
 *
 * Renders an automatic "You may also like" widget inside the cart drawer and
 * cart page. Recommendations come from Shopify's Product Recommendations API,
 * seeded off the most recently added cart item, and are re-fetched whenever the
 * cart changes. Cards reuse the theme's cart-native `upsell-product` markup, so
 * they match the existing "Pair products" widget.
 */
(function () {
  if (customElements.get('cart-recommendations')) return;

  const SELECTORS = {
    widget: '[data-cart-recommendations-widget]',
    holder: '[data-cart-recommendations-holder]',
    template: '[data-api-cart-recommendation-template]',
    card: 'quick-add-product',
    productId: '[data-quick-add-holder]',
  };
  const HIDDEN = 'hidden';

  customElements.define(
    'cart-recommendations',
    class extends HTMLElement {
      constructor() {
        super();
        this.holder = this.querySelector(SELECTORS.holder);
        this.widget = this.closest(SELECTORS.widget) || this;
        this.limit = parseInt(this.getAttribute('data-limit'), 10) || 4;
        this.intent = this.getAttribute('data-intent') || 'related';
        // Optional viewport gating. Lets a flyout instance (desktop) and a
        // stacked instance (mobile) share the page without both rendering the
        // same cards — which would duplicate element IDs and double-fetch.
        this.minWidth = parseInt(this.getAttribute('data-min-width'), 10) || 0;
        this.maxWidth = parseInt(this.getAttribute('data-max-width'), 10) || 0;
        this.currentSeed = null;
        this.resizeTimer = null;
        this.onCartChange = this.onCartChange.bind(this);
        this.onResize = this.onResize.bind(this);
      }

      connectedCallback() {
        this.loadRecommendations();
        document.addEventListener('theme:cart:change', this.onCartChange);
        if (this.minWidth || this.maxWidth) {
          window.addEventListener('resize', this.onResize);
        }
      }

      disconnectedCallback() {
        document.removeEventListener('theme:cart:change', this.onCartChange);
        window.removeEventListener('resize', this.onResize);
      }

      isActive() {
        const width = window.innerWidth;
        if (this.minWidth && width < this.minWidth) return false;
        if (this.maxWidth && width > this.maxWidth) return false;
        return true;
      }

      onResize() {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => this.loadRecommendations(), 200);
      }

      onCartChange() {
        this.loadRecommendations();
      }

      loadRecommendations() {
        // When gated out of the current viewport, clear any rendered cards so
        // their IDs/forms don't linger in the DOM, and let the active instance own them.
        if (!this.isActive()) {
          this.holder.innerHTML = '';
          this.currentSeed = null;
          this.hide();
          return;
        }

        fetch(`${window.theme.routes.cart_url}.js`)
          .then((response) => response.json())
          .then((cart) => {
            if (!cart.items || cart.items.length === 0) {
              this.currentSeed = null;
              this.hide();
              return;
            }

            // Seed off the most recently added item — the freshest signal of intent.
            const seed = cart.items[cart.items.length - 1].product_id;
            if (seed === this.currentSeed) return;

            this.currentSeed = seed;
            const cartProductIds = cart.items.map((item) => item.product_id);
            this.fetchRecommendations(seed, cartProductIds);
          })
          .catch(() => this.hide());
      }

      fetchRecommendations(seed, cartProductIds) {
        const url = `${window.theme.routes.product_recommendations_url}?section_id=api-cart-recommendation&limit=${this.limit}&product_id=${seed}&intent=${this.intent}`;

        fetch(url)
          .then((response) => response.text())
          .then((text) => this.render(text, cartProductIds))
          .catch(() => this.hide());
      }

      render(text, cartProductIds) {
        const parsed = new DOMParser().parseFromString(text, 'text/html');
        const template = parsed.querySelector(SELECTORS.template);

        if (!template) {
          this.hide();
          return;
        }

        const fragment = document.createElement('div');
        fragment.innerHTML = template.innerHTML;

        // Don't recommend what's already in the cart.
        fragment.querySelectorAll(SELECTORS.productId).forEach((node) => {
          const id = parseInt(node.getAttribute('data-quick-add-holder'), 10);
          if (cartProductIds.indexOf(id) !== -1) {
            const card = node.closest(SELECTORS.card) || node;
            card.remove();
          }
        });

        if (fragment.querySelectorAll(SELECTORS.card).length === 0) {
          this.hide();
          return;
        }

        this.holder.innerHTML = fragment.innerHTML;
        this.show();
      }

      hide() {
        this.widget.setAttribute(HIDDEN, '');
      }

      show() {
        this.widget.removeAttribute(HIDDEN);
      }
    }
  );
})();
