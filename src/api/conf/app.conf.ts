import { LogLevel } from "@/utils/logger/log-level";

export default {
    endpoint: "filspb.dudosyka.ru",
    proto: "https",
    refreshEndpoint: "/auth/refresh",
    loggerLevel: LogLevel.DEBUG,
    loggerExcludedPrefixes: [],
    showStackTrace: false,
}