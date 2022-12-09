import {Body, Get, JsonController, Param, Post, Put} from 'routing-controllers';
import {
    getConfluenceContentByCQLQuery,
    getConfluenceContentById, getConfluenceContentByTitle,
    updateConfluenceContentById
} from "../services/confluenceService"

@JsonController('/v1/confluence')
export class ConfluenceController {
    @Get('/:contentId')
    async getConfluenceContentById(@Param("contentId") contentId: string) {
        return await getConfluenceContentById(contentId);
    }

    @Post('/search')
    async getConfluenceContentByCQLQuery(@Body() cqlQuery: string) {
        return await getConfluenceContentByCQLQuery(cqlQuery);
    }

    @Post('/search/title')
    async getConfluenceContentByTitle(@Body() title: string) {
        return await getConfluenceContentByTitle(title);
    }

    @Put('/:contentId')
    async updateConfluenceContent(@Param("contentId") contentId: string, @Body() contentBody: string) {
        return await updateConfluenceContentById(contentId, contentBody);
    }
}
