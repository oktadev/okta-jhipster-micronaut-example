import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MissionComponentsPage, MissionDeleteDialog, MissionUpdatePage } from './mission.page-object';

const expect = chai.expect;

describe('Mission e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let missionComponentsPage: MissionComponentsPage;
  let missionUpdatePage: MissionUpdatePage;
  let missionDeleteDialog: MissionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Missions', async () => {
    await navBarPage.goToEntity('mission');
    missionComponentsPage = new MissionComponentsPage();
    await browser.wait(ec.visibilityOf(missionComponentsPage.title), 5000);
    expect(await missionComponentsPage.getTitle()).to.eq('spaceApp.mission.home.title');
    await browser.wait(ec.or(ec.visibilityOf(missionComponentsPage.entities), ec.visibilityOf(missionComponentsPage.noResult)), 1000);
  });

  it('should load create Mission page', async () => {
    await missionComponentsPage.clickOnCreateButton();
    missionUpdatePage = new MissionUpdatePage();
    expect(await missionUpdatePage.getPageTitle()).to.eq('spaceApp.mission.home.createOrEditLabel');
    await missionUpdatePage.cancel();
  });

  it('should create and save Missions', async () => {
    const nbButtonsBeforeCreate = await missionComponentsPage.countDeleteButtons();

    await missionComponentsPage.clickOnCreateButton();

    await promise.all([missionUpdatePage.setNameInput('name'), missionUpdatePage.setDescriptionInput('description')]);

    expect(await missionUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await missionUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');

    await missionUpdatePage.save();
    expect(await missionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await missionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Mission', async () => {
    const nbButtonsBeforeDelete = await missionComponentsPage.countDeleteButtons();
    await missionComponentsPage.clickOnLastDeleteButton();

    missionDeleteDialog = new MissionDeleteDialog();
    expect(await missionDeleteDialog.getDialogTitle()).to.eq('spaceApp.mission.delete.question');
    await missionDeleteDialog.clickOnConfirmButton();

    expect(await missionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
