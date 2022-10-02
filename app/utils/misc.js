function getDomainUrl(request) {
    const host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  
    if (!host) {
      throw new Error("Could not determine domain URL.");
    }
  
    const protocol = host.includes("localhost") ? "http" : "https";
  
    return `${protocol}://${host}`;
  }
  
  function getRequiredEnvVar(key, env = process.env) {
    if (key in env && typeof env[key] === "string") {
      return env[key] ?? "";
    }
  
    throw new Error(`Environment variable ${key} is not defined`);
  }
  
  function removeTrailingSlash(s) {
    return s.endsWith("/") ? s.slice(0, -1) : s;
  }
  
  export { getDomainUrl, getRequiredEnvVar, removeTrailingSlash };