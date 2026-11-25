// Browser configuration is supplied by the root config.js file.
// No .env file, Node.js runtime, bundler or build step is required.
const supplied = window.PFC_CONFIG || {};
export const config = {
  supabaseUrl: supplied.supabaseUrl || "",
  supabaseAnonKey: supplied.supabaseAnonKey || "",
  demoMode: supplied.demoMode !== false,
  appName: "PFC — Play. Compete. Belong."
};
export const isSupabaseConfigured = Boolean(config.supabaseUrl && config.supabaseAnonKey);
