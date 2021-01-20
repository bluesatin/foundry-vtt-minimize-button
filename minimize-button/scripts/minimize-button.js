// ┌──────────────────────────────────┐
// │  #Hooks - Global Event Handlers  │
// ╘══════════════════════════════════╛
// When game is initialised
Hooks.on("init", () => {
    // Make changes to the existing Application class
    patchApplicationClass();
    // Debugging
    console.log("minimize-button | Module Loaded.");
});
// ┌────────────────┐
// │   #Functions   │
// ╘════════════════╛
// Patch the existing Application Class
function patchApplicationClass() {
    // Make _onToggleMinimize async
    Application.prototype._onToggleMinimize = async function(ev) {
        // Prevent default click event
        ev.preventDefault();
        // Minimize or Maximize
        if (this._minimized) {
            await this.maximize();
        } else {
            await this.minimize();
        }
    }
    // Add minimize button to header buttons
    Application.prototype._getHeaderButtons = function() {
        // Define new minimize button
        const minimizeButton = {
            label: "Minimize",
            class: "minimize",
            icon: "far fa-window-minimize",
            onclick: async (ev) => {
                // Initialise
                const element = ev.target.closest("a");
                const window = ev.target.closest(".app");
                // Get minimizing status
                const minimizing = !this._minimized;
                // Add close class to stop it being hidden
                element.classList.add("close");
                window.style.minWidth
                // Toggle minimize status
                if (minimizing) { 
                    element.innerHTML = `<i class="far fa-window-restore"></i>Restore`;
                    await this._onToggleMinimize(ev);
                    // await this.minimize(ev);
                } else { 
                    element.innerHTML = `<i class="far fa-window-minimize"></i>Minimize`;
                    await this._onToggleMinimize(ev);
                    // await this.maximize(ev);
                }
                // Remove close class
                element.classList.remove("close");
            },
        };
        // Define original close button
        const buttons = [
            {
                label: "Close",
                class: "close",
                icon: "fas fa-times",
                onclick: () => { this.close(); },
            },
        ];
        // If window is minimizable, then add new minimize button to start of list
        if (this.options.minimizable) { buttons.unshift(minimizeButton); }
        // Call chain of parent classes
        for (let cls of this.constructor._getInheritanceChain()) {
            Hooks.call(`get${cls.name}HeaderButtons`, this, buttons);
        }
        // Return an array of buttons
        return buttons;
    }
    // Make minimize() use module settings rather than global width const
    Application.prototype.minimize = async function(options={}) {
        // If this isn't a popout or is already minimized, exit out
        if (!this.popOut || [true, null].includes(this._minimized)) { return; }
        // Initialise
        const minWindowWidth = options.minWindowWidth ?? 
                               game.settings.get("minimize-button", "minWindowWidth") ?? 
                               MIN_WINDOW_WIDTH;
        const minWindowHeight = options.minWindowHeight ?? 
                                game.settings.get("minimize-button", "minWindowHeight") ?? 
                                MIN_WINDOW_HEIGHT;
        // Change status
        this._minimized = null;
        // Get content
        let window = this.element,
            header = window.find('.window-header'),
            content = window.find('.window-content');
        // Remove minimum width and height styling rules
        window.css({minWidth: 100, minHeight: 30});
        // Slide-up content
        content.slideUp(100);
        // Slide up window height
        return new Promise((resolve) => {
            window.animate({height: `${header[0].offsetHeight+1}px`}, 100, () => {
                header.children().not(".window-title").not(".close, .minimize").hide();
                window.animate({width: minWindowWidth}, 100, () => {
                    window.addClass("minimized");
                    this._minimized = true;
                    resolve();
                });
            });
        })
    }
}