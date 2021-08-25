// ┌─────────────────────────┐
// │  #Init - Initial Setup  │
// ╘═════════════════════════╛
const module = "minimize-button";
// ┌──────────────────────────────────┐
// │  #Hooks - Global Event Handlers  │
// ╘══════════════════════════════════╛
// When game is initialised
Hooks.once("init", () => {
    // Register module settings
    registerSettings();
    // Debugging
    console.log(`${module} | Settings Registered.`);
});
// ┌────────────────────────────────────────┐
// │  #Settings - Register Module Settings  │
// ╘════════════════════════════════════════╛
// For registering module settings
function registerSettings() {
    // Setting - showButtonLabel
    game.settings.register(module, "showButtonLabel", {
        // Display
        name: "Display label on the minimize/restore button.",
        hint: "Toggles the 'minimize'/'restore' text on the button (module-default: true).",
        // General
        scope: "client", //World (Global GM setting) or Client (Player setting)?
        config: true, //Show in the module config menu?
        // Data
        type: Boolean,
        default: true,
    });
    // Setting - minWidth for minimized windows
    game.settings.register(module, "minWindowWidth", {
        // Display
        name: "Minimum width of minimized window titlebars",
        hint: "Sets the width that minimized windows shrink to (foundry-default: 200, module-default: 300).",
        // General
        scope: "client", //World (Global GM setting) or Client (Player setting)?
        config: true, //Show in the module config menu?
        // Data
        type: Number,
        range: {
            min: 200,
            max: 500,
            step: 10,
        },
        default: 300,
    });
}
