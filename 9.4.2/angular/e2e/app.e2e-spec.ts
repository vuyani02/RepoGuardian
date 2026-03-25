import { FullStackProjectTemplatePage } from './app.po';

describe('FullStackProject App', function() {
  let page: FullStackProjectTemplatePage;

  beforeEach(() => {
    page = new FullStackProjectTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
