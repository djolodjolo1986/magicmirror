import {CustomConfluenceExpand} from "../models/enums/customConfluenceExpand";
import {clientConfig} from "../utils/confluenceClientConfiguration";
import {Content} from "confluence.js/out/api/models";
import {ConfluenceContentResponse} from "../models/responses/confluenceContentResponse";
import {Models} from "confluence.js";
import {CreateAttachments} from "confluence.js/out/api/parameters";
import {Birthday} from "../models/birthday";
import {
    HTTP_ERROR_STATUS_INTERNAL_SERVER_ERROR
} from "../utils/constants";
import {CUSTOM_HTML_BIRTHDAY_INTRO, handleBirthdayHtml} from "../helpers/htmlHellper";
import {HttpError} from "routing-controllers";
import axios from "axios";


export const getConfluenceContentById: (contentId: string) => Promise<ConfluenceContentResponse> = async (contentId: string) => {
    try {
        let response: Content = await clientConfig.content.getContentById({
            id: contentId,
            expand: CustomConfluenceExpand.BodyStorage
        });

        return ConfluenceContentResponse.MAP(response);
    } catch(error){
        if(axios.isAxiosError(error)){
            throw new HttpError(error.response.data.statusCode, error.response.data.message)
        }
        throw new HttpError(HTTP_ERROR_STATUS_INTERNAL_SERVER_ERROR, error.message);
    }
}

export const getConfluenceContentByCQLQuery: (cqlQuery: string) => Promise<ConfluenceContentResponse|Models.ContentArray> = async (cqlQuery: string) => {
   try {
       const query = JSON.parse(JSON.stringify(cqlQuery));
       const response = await clientConfig.content.searchContentByCQL({
           cql: query.cqlQuery
       });

       if(query.getOnlyId){
           return ConfluenceContentResponse.MAP(response.results[0]);
       }

       return response;
   } catch(error){
       if(axios.isAxiosError(error)){
           throw new HttpError(error.response.data.statusCode, error.response.data.message)
       }
       throw new HttpError(HTTP_ERROR_STATUS_INTERNAL_SERVER_ERROR, error.message);
   }
}

export const getConfluenceContentByTitle: (title: string) => Promise<ConfluenceContentResponse> = async (title: string) => {
    try {
        const query = JSON.parse(JSON.stringify(title));
        const searchResponse = await clientConfig.content.searchContentByCQL({
            cql: `title = '${query.title}'`
        });

        return await getConfluenceContentById(searchResponse.results[10].id);
    } catch(error){
        if(axios.isAxiosError(error)){
            throw new HttpError(error.response.data.statusCode, error.response.data.message)
        }
        throw new HttpError(HTTP_ERROR_STATUS_INTERNAL_SERVER_ERROR, error.message);
    }
}

export const updateConfluenceContentById: (contentId: string, contentBody: string) => Promise<Object> = async (contentId: string, contentBody: string) => {
    try{
        let response: Content = await clientConfig.content.getContentById({
            id: contentId
        });

        const bodyValue = JSON.parse(JSON.stringify(contentBody));
        let versionNumber = response.version.number;

        await clientConfig.content.updateContent({
            id: response.id,
            version: {number: (versionNumber + 1)},
            type: response.type,
            title: response.title,
            status: 'current',
            body: {
                storage: {
                    value: bodyValue.contentBody.toString(),
                    representation: "storage"
                }
            }
        })
        return {
            message: "Content has been successfully updated"
        };
    } catch(error){
        if(axios.isAxiosError(error)){
            throw new HttpError(error.response.data.statusCode, error.response.data.message)
        }
        throw new HttpError(HTTP_ERROR_STATUS_INTERNAL_SERVER_ERROR, error.message);
    }
}

export const updateConfluenceBirthdayPage: (birthdays: Array<Birthday>) => void = async (birthdays: Array<Birthday>) => {
    try {
        let response: Content = await clientConfig.content.getContentById({
            id: "4014506041" //CONFLUENCE_SY_BIRTHDAYS_PAGE_ID
        });

        let versionNumber = response.version.number;
        let contentBody:string = "";
        birthdays.forEach(element => {
            contentBody = handleBirthdayHtml(element, contentBody);
        });

        await clientConfig.content.updateContent({
            id: response.id,
            version: { number: (versionNumber + 1)},
            type: response.type,
            title: response.title,
            status: 'current',
            body: {
                storage: {
                    value: CUSTOM_HTML_BIRTHDAY_INTRO + contentBody,
                    representation: "storage"
                }
            }
        })
    } catch(error){
        if(axios.isAxiosError(error)){
            throw new HttpError(error.response.data.statusCode, error.response.data.message)
        }
        throw new HttpError(HTTP_ERROR_STATUS_INTERNAL_SERVER_ERROR, error.message);
    }
}


// "<p>DJOLE</p><div><ac:image><ri:attachment ri:filename=\"djordje-andric.png\" /></ac:image></div>",
// return await clientConfig.contentAttachments.createAttachments({
//     id: "",
//     status: "draft",
//     attachments: {
//         file: "",
//         filename: "naziv",
//         minorEdit: false
//     }
// });
