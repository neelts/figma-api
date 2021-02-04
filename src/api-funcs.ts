import { API_DOMAIN, API_VER } from "./config";
import { Vector, FrameOffset } from "./ast-types";
import {
    GetFileNodesResult,
    GetImageResult,
    GetImageFillsResult,
    GetFileResult,
    GetCommentsResult,
    PostCommentResult,
    GetUserMeResult,
    GetVersionsResult,
    GetTeamProjectsResult,
    GetProjectFilesResult,
    GetTeamComponentsResult,
    GetTeamStylesResult,
    GetComponentResult,
    GetStyleResult,
    GetFileComponentsResult,
    GetTeamComponentSetsResult,
    GetFileComponentSetsResult,
    GetComponentSetResult
} from "./api-types";
import { ApiRequestMethod, toQueryParams } from "./utils";

type ApiClass = {
    request: ApiRequestMethod
};

export function getFileApi(this: ApiClass,
    /**
     * File to export JSON from
     * 
     * Can be found in url to file, eg:  
     * https://www.figma.com/file/FILE_KEY/FILE_NAME
     */
    file_key: string,
    opts?: {
        /** A specific version ID to get. Omitting this will get the current version of the file */
        version?: string,
        /** If specified, only a subset of the document will be returned corresponding to the nodes listed, their children, and everything between the root node and the listed nodes */
        ids?: string[],
        /** Positive integer representing how deep into the document tree to traverse. For example, setting this to 1 returns only Pages, setting it to 2 returns Pages and all top level objects on each page. Not setting this parameter returns all nodes */
        depth?: number,
        /** Set to "paths" to export vector data */
        geometry?: 'paths',
        /** A comma separated list of plugin IDs and/or the string "shared". Any data present in the document written by those plugins will be included in the result in the `pluginData` and `sharedPluginData` properties. */
        pluginData?: string,
    }
): Promise<GetFileResult> {
    const queryParams = toQueryParams({ ...opts, ids: opts && opts.ids && opts.ids.join(',') });
    return this.request<GetFileResult>(`${API_DOMAIN}/${API_VER}/files/${file_key}?${queryParams}`);
}

export function getFileNodesApi(this: ApiClass,
    /**
     * File to export JSON from
     * 
     * Can be found in url to file, eg:  
     * https://www.figma.com/file/FILE_KEY/FILE_NAME
     */
    file_key: string,
    /** list of node IDs to retrieve and convert */
    ids: string[],
    opts?: {
        /** A specific version ID to get. Omitting this will get the current version of the file */
        version?: string,
        /** Positive integer representing how deep into the document tree to traverse. For example, setting this to 1 returns only Pages, setting it to 2 returns Pages and all top level objects on each page. Not setting this parameter returns all nodes */
        depth?: number,
        /** Set to "paths" to export vector data */
        geometry?: 'paths',
        /** A comma separated list of plugin IDs and/or the string "shared". Any data present in the document written by those plugins will be included in the result in the `pluginData` and `sharedPluginData` properties. */
        plugin_data?: string,
    }
): Promise<GetFileNodesResult> {
    const queryParams = toQueryParams({ ...opts, ids: ids.join(',') });
    return this.request<GetFileNodesResult>(`${API_DOMAIN}/${API_VER}/files/${file_key}/nodes?${queryParams}`);
}

export function getImageApi(this: ApiClass,
    file_key: string,
    opts: {
        /** A comma separated list of node IDs to render */
        ids: string,
        /** A number between 0.01 and 4, the image scaling factor */
        scale: number,
        /** A string enum for the image output format */
        format: 'jpg'|'png'|'svg'|'pdf',
        /** Whether to include id attributes for all SVG elements. `Default: false` */
        svg_include_id?: boolean,
        /** Whether to simplify inside/outside strokes and use stroke attribute if possible instead of <mask>. `Default: true` */
        svg_simplify_stroke?: boolean,
        /** Use the full dimensions of the node regardless of whether or not it is cropped or the space around it is empty. Use this to export text nodes without cropping. `Default: false` */
        use_absolute_bounds?: boolean,
        /** A specific version ID to get. Omitting this will get the current version of the file */
        version?: string,
    }
): Promise<GetImageResult> {
    const queryParams = toQueryParams(opts);
    return this.request<GetImageResult>(`${API_DOMAIN}/${API_VER}/images/${file_key}?${queryParams}`);
}

export function getImageFillsApi(this: ApiClass, fileKey: string): Promise<GetImageFillsResult> {
    return this.request<GetImageFillsResult>(`${API_DOMAIN}/${API_VER}/files/${fileKey}/images`);
}

export function getCommentsApi(this: ApiClass, fileKey: string): Promise<GetCommentsResult> {
    return this.request<GetCommentsResult>(`${API_DOMAIN}/${API_VER}/files/${fileKey}/comments`);
}

export function postCommentsApi(
    this: ApiClass,
    file_key: string,
    message: string,
    client_meta: Vector|FrameOffset,
    comment_id?: string,
): Promise<PostCommentResult> {
    const body = {
        message,
        client_meta,
        ...(comment_id && { comment_id })
    };

    return this.request<PostCommentResult>(`${API_DOMAIN}/${API_VER}/files/${file_key}/comments`, {
        method: 'POST',
        data: JSON.stringify(body),
    });
}

export function getUserMeApi(this: ApiClass): Promise<GetUserMeResult> {
    return this.request(`${API_DOMAIN}/${API_VER}/me`);
}

export function getVersionsApi(this: ApiClass, file_key: string): Promise<GetVersionsResult> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${file_key}/versions`);
}

export function getTeamProjectsApi(this: ApiClass, team_id: string): Promise<GetTeamProjectsResult> {
    return this.request(`${API_DOMAIN}/${API_VER}/teams/${team_id}/projects`);
}

export function getProjectFilesApi(this: ApiClass, project_id: string): Promise<GetProjectFilesResult> {
    return this.request(`${API_DOMAIN}/${API_VER}/projects/${project_id}/files`);
}

/** Get a paginated list of published components within a team library */
export function getTeamComponentsApi(
    this: ApiClass,
    /** Id of the team to list components from */
    team_id: string,
    opts: {
        /** Number of items in a paged list of results. Defaults to 30. */
        page_size?: number,
        /** Cursor indicating which id after which to start retrieving components for. Exclusive with before. The cursor value is an internally tracked integer that doesn't correspond to any Ids */
        after?: string,
        /** Cursor indicating which id before which to start retrieving components for. Exclusive with after. The cursor value is an internally tracked integer that doesn't correspond to any Ids */
        before?: string,
    } = {}
): Promise<GetTeamComponentsResult> {
    const queryParams = toQueryParams(opts);
    return this.request(`${API_DOMAIN}/${API_VER}/teams/${team_id}/components?${queryParams}`);
}

/** Get a paginated list of published component_sets within a team library */
export function getTeamComponentSetsApi(
    this: ApiClass,
    /** Id of the team to list component_sets from */
    team_id: string,
    opts: {
        /** Number of items in a paged list of results. Defaults to 30. */
        page_size?: number,
        /** Cursor indicating which id after which to start retrieving components for. Exclusive with before. The cursor value is an internally tracked integer that doesn't correspond to any Ids */
        after?: string,
        /** Cursor indicating which id before which to start retrieving components for. Exclusive with after. The cursor value is an internally tracked integer that doesn't correspond to any Ids */
        before?: string,
    } = {}
): Promise<GetTeamComponentSetsResult> {
    const queryParams = toQueryParams(opts);
    return this.request(`${API_DOMAIN}/${API_VER}/teams/${team_id}/component_sets?${queryParams}`);
}

/** Get a list of published components within a file library */
export function getFileComponentsApi(this: ApiClass, project_id: string): Promise<GetFileComponentsResult> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${project_id}/components`);
}

/** Get a list of published component_sets within a file library */
export function getFileComponentSetsApi(this: ApiClass, project_id: string): Promise<GetFileComponentSetsResult> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${project_id}/component_sets`);
}

/** Get metadata on a component by key. */
export function getComponentApi(this: ApiClass, componentKey: string): Promise<GetComponentResult> {
    return this.request(`${API_DOMAIN}/${API_VER}/components/${componentKey}`);
}

/** Get metadata on a component_set by key. */
export function getComponentSetApi(this: ApiClass, componentKey: string): Promise<GetComponentSetResult> {
    return this.request(`${API_DOMAIN}/${API_VER}/component_sets/${componentKey}`);
}

export function getTeamStylesApi(
    this: ApiClass,
    team_id: string,
    opts: {
        /** Number of items in a paged list of results. Defaults to 30. */
        page_size?: number,
        /** Cursor indicating which id after which to start retrieving components for. Exclusive with before. The cursor value is an internally tracked integer that doesn't correspond to any Ids */
        after?: string,
        /** Cursor indicating which id before which to start retrieving components for. Exclusive with after. The cursor value is an internally tracked integer that doesn't correspond to any Ids */
        before?: string,
    } = {}
): Promise<GetTeamStylesResult> {
    const queryParams = toQueryParams(opts);
    return this.request(`${API_DOMAIN}/${API_VER}/teams/${team_id}/styles?${queryParams}`);
}


/** Get a list of published styles within a file library */
export function getFileStylesApi(
    this: ApiClass,
    fileKey: string,
): Promise<GetFileComponentsResult> {
    return this.request(`${API_DOMAIN}/${API_VER}/files/${fileKey}/styles`);
}

/** Get metadata on a style by key. */
export function getStyleApi(
    this: ApiClass,
    /** The unique identifier of the style */
    styleKey: string,
): Promise<GetStyleResult> {
    return this.request(`${API_DOMAIN}/${API_VER}/styles/${styleKey}`);
}