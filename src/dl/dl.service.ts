import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
@Injectable()
export class DlService {
  async dowloadTikTok(url: string) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('https://snaptik.app/vn');
    await page.setViewport({ width: 1080, height: 1024 });
    await page.type('#url', `${url}`);
    const searchResultSelector = '#hero > div > form > button';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);
    const textSelector = await page.waitForSelector(
      '#download > div > div.video-header.mb-3 > div > div',
    );
    const fullTitle = await textSelector?.evaluate((el) => el.textContent);
    const href = await page.evaluate(() => {
      return document
        .querySelector('#download > div > div.video-links > a:nth-child(1)')
        .getAttribute('href');
    });
    await browser.close();
    return {
      url: href,
      title: fullTitle,
    };
  }
  async downloadFacebook(url: string) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('https://www.getfvid.com/vi');
    await page.setViewport({ width: 1080, height: 1024 });
    await page.type('#form_download > div > input', `${url}`);
    const searchResultSelector = '#btn_submit';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);
    const textSelector = await page.waitForSelector(
      'body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-5.no-padd > div > h5 > a',
    );
    const fullTitle = await textSelector?.evaluate((el) => el.textContent);
    const href = await page.evaluate(() => {
      return document
        .querySelector(
          'body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a',
        )
        .getAttribute('href');
    });
    await browser.close();
    return {
      url: href,
      title: fullTitle,
    };
  }
  async downloadPinterest(url: string) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('https://pinterestdownloader.com/vi');
    await page.setViewport({ width: 1080, height: 1024 });
    await page.type('#download_input', `${url}`);
    const searchResultSelector = '#download_button';
    await page.click(searchResultSelector);
    await page.waitForSelector(searchResultSelector);
    const processingSuccess =
      'body > div.container > div > div > div.row > div:nth-child(1) > img';
    await page.waitForSelector(processingSuccess);
    const src = await page.evaluate(() => {
      return document
        .querySelector(
          'body > div.container > div > div > div.row > div:nth-child(1) > img',
        )
        .getAttribute('src');
    });
    await browser.close();
    return {
      url: src,
    };
  }
  async dowloadInstagram(url: string) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('https://igdownloader.app/vi');
    await page.setViewport({ width: 1080, height: 1024 });
    await page.type('#s_input', `${url}`);
    const searchResultSelector = '#search-form > div > div > button';
    await page.click(searchResultSelector);
    await page.waitForSelector(searchResultSelector);
    const processingSuccess =
      '#download-result > ul > li > div > div.download-items__btn > a';
    await page.waitForSelector(processingSuccess);
    const src = await page.evaluate(() => {
      return document
        .querySelector(
          '#download-result > ul > li > div > div.download-items__btn > a',
        )
        .getAttribute('href');
    });
    await browser.close();
    return {
      url: src,
    };
  }
}
