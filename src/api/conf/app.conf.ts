import { LogLevel } from "@/utils/logger/log-level";

export default {
    // endpoint: "filspb.dudosyka.ru",
    // proto: "https",
    endpoint: "localhost:8090",
    proto: "http",
    refreshEndpoint: "/auth/refresh",
    loggerLevel: LogLevel.DEBUG,
    loggerExcludedPrefixes: [],
    showStackTrace: false,
}