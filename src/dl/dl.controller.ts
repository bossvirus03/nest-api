import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { DlService } from './dl.service';

@Controller('dl')
export class DlController {
  constructor(private readonly dlService: DlService) {}
  @Post('/tiktok')
  async dowloadTikTok(@Body('url') url: string) {
    const res = await this.dlService.dowloadTikTok(url);
    return res;
  }
  @Post('/facebook')
  async downloadFacebook(@Body('url') url: string) {
    const res = await this.dlService.downloadFacebook(url);
    return res;
  }
  @Post('/pinterest')
  async downloadPinterest(@Body('url') url: string) {
    const res = await this.dlService.downloadPinterest(url);
    return res;
  }

  @Post('/instagram')
  async dowloadInstagram(@Body('url') url: string) {
    const res = await this.dlService.dowloadInstagram(url);
    return res;
  }
}
