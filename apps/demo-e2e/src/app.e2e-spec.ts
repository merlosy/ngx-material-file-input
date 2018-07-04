import { AppPage } from './app.po';

describe('demo App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  xit('should display welcome message', () => {
    page.navigateTo();
    expect(page.text()).toContain('Welcome');
  });
});
