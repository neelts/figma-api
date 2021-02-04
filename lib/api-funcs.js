"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStyleApi = exports.getFileStylesApi = exports.getTeamStylesApi = exports.getComponentSetApi = exports.getComponentApi = exports.getFileComponentSetsApi = exports.getFileComponentsApi = exports.getTeamComponentSetsApi = exports.getTeamComponentsApi = exports.getProjectFilesApi = exports.getTeamProjectsApi = exports.getVersionsApi = exports.getUserMeApi = exports.postCommentsApi = exports.getCommentsApi = exports.getImageFillsApi = exports.getImageApi = exports.getFileNodesApi = exports.getFileApi = void 0;
var config_1 = require("./config");
var utils_1 = require("./utils");
function getFileApi(
/**
 * File to export JSON from
 *
 * Can be found in url to file, eg:
 * https://www.figma.com/file/FILE_KEY/FILE_NAME
 */
file_key, opts) {
    var queryParams = utils_1.toQueryParams(__assign(__assign({}, opts), { ids: opts && opts.ids && opts.ids.join(',') }));
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + file_key + "?" + queryParams);
}
exports.getFileApi = getFileApi;
function getFileNodesApi(
/**
 * File to export JSON from
 *
 * Can be found in url to file, eg:
 * https://www.figma.com/file/FILE_KEY/FILE_NAME
 */
file_key, 
/** list of node IDs to retrieve and convert */
ids, opts) {
    var queryParams = utils_1.toQueryParams(__assign(__assign({}, opts), { ids: ids.join(',') }));
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + file_key + "/nodes?" + queryParams);
}
exports.getFileNodesApi = getFileNodesApi;
function getImageApi(file_key, opts) {
    var queryParams = utils_1.toQueryParams(opts);
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/images/" + file_key + "?" + queryParams);
}
exports.getImageApi = getImageApi;
function getImageFillsApi(fileKey) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + fileKey + "/images");
}
exports.getImageFillsApi = getImageFillsApi;
function getCommentsApi(fileKey) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + fileKey + "/comments");
}
exports.getCommentsApi = getCommentsApi;
function postCommentsApi(file_key, message, client_meta, comment_id) {
    var body = __assign({ message: message,
        client_meta: client_meta }, (comment_id && { comment_id: comment_id }));
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + file_key + "/comments", {
        method: 'POST',
        data: JSON.stringify(body),
    });
}
exports.postCommentsApi = postCommentsApi;
function getUserMeApi() {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/me");
}
exports.getUserMeApi = getUserMeApi;
function getVersionsApi(file_key) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + file_key + "/versions");
}
exports.getVersionsApi = getVersionsApi;
function getTeamProjectsApi(team_id) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/teams/" + team_id + "/projects");
}
exports.getTeamProjectsApi = getTeamProjectsApi;
function getProjectFilesApi(project_id) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/projects/" + project_id + "/files");
}
exports.getProjectFilesApi = getProjectFilesApi;
/** Get a paginated list of published components within a team library */
function getTeamComponentsApi(
/** Id of the team to list components from */
team_id, opts) {
    if (opts === void 0) { opts = {}; }
    var queryParams = utils_1.toQueryParams(opts);
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/teams/" + team_id + "/components?" + queryParams);
}
exports.getTeamComponentsApi = getTeamComponentsApi;
/** Get a paginated list of published component_sets within a team library */
function getTeamComponentSetsApi(
/** Id of the team to list component_sets from */
team_id, opts) {
    if (opts === void 0) { opts = {}; }
    var queryParams = utils_1.toQueryParams(opts);
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/teams/" + team_id + "/component_sets?" + queryParams);
}
exports.getTeamComponentSetsApi = getTeamComponentSetsApi;
/** Get a list of published components within a file library */
function getFileComponentsApi(project_id) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + project_id + "/components");
}
exports.getFileComponentsApi = getFileComponentsApi;
/** Get a list of published component_sets within a file library */
function getFileComponentSetsApi(project_id) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + project_id + "/component_sets");
}
exports.getFileComponentSetsApi = getFileComponentSetsApi;
/** Get metadata on a component by key. */
function getComponentApi(componentKey) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/components/" + componentKey);
}
exports.getComponentApi = getComponentApi;
/** Get metadata on a component_set by key. */
function getComponentSetApi(componentKey) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/component_sets/" + componentKey);
}
exports.getComponentSetApi = getComponentSetApi;
function getTeamStylesApi(team_id, opts) {
    if (opts === void 0) { opts = {}; }
    var queryParams = utils_1.toQueryParams(opts);
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/teams/" + team_id + "/styles?" + queryParams);
}
exports.getTeamStylesApi = getTeamStylesApi;
/** Get a list of published styles within a file library */
function getFileStylesApi(fileKey) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/files/" + fileKey + "/styles");
}
exports.getFileStylesApi = getFileStylesApi;
/** Get metadata on a style by key. */
function getStyleApi(
/** The unique identifier of the style */
styleKey) {
    return this.request(config_1.API_DOMAIN + "/" + config_1.API_VER + "/styles/" + styleKey);
}
exports.getStyleApi = getStyleApi;
//# sourceMappingURL=api-funcs.js.map