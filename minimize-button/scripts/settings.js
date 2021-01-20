// ┌──────────────────────────────────┐
// │  #Hooks - Global Event Handlers  │
// ╘══════════════════════════════════╛
// When game is initialised
Hooks.once("init", () => {
	// Register module settings
	registerSettings();
	// Debugging
	console.log("minimize-button | Settings Registered.");
});
// ┌────────────────────────────────────────┐
// │  #Settings - Register Module Settings  │
// ╘════════════════════════════════════════╛
// For registering module settings
function registerSettings() {
	// Setting - minWidth for minimized windows
	game.settings.register("minimize-button", "minWindowWidth", {
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
	// Setting - minHeight for minimized windows
	game.settings.register("minimize-button", "minWindowHeight", {
		// Display
		name: "Minimum height of minimized window titlebars",
	    hint: "Sets the height that minimized windows shrink to (foundry-default: 50).",
	    // General
	  	scope: "client", //World (Global GM setting) or Client (Player setting)?
	  	config: false, //Show in the module config menu?
	  	// Data
	  	type: Number,
	  	default: 50,
	});
}