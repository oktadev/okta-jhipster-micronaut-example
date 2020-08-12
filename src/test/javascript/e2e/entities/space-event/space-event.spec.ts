import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SpaceEventComponentsPage, SpaceEventDeleteDialog, SpaceEventUpdatePage } from './space-event.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('SpaceEvent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let spaceEventComponentsPage: SpaceEventComponentsPage;
  let spaceEventUpdatePage: SpaceEventUpdatePage;
  let spaceEventDeleteDialog: SpaceEventDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SpaceEvents', async () => {
    await navBarPage.goToEntity('space-event');
    spaceEventComponentsPage = new SpaceEventComponentsPage();
    await browser.wait(ec.visibilityOf(spaceEventComponentsPage.title), 5000);
    expect(await spaceEventComponentsPage.getTitle()).to.eq('spaceApp.spaceEvent.home.title');
    await browser.wait(ec.or(ec.visibilityOf(spaceEventComponentsPage.entities), ec.visibilityOf(spaceEventComponentsPage.noResult)), 1000);
  });

  it('should load create SpaceEvent page', async () => {
    await spaceEventComponentsPage.clickOnCreateButton();
    spaceEventUpdatePage = new SpaceEventUpdatePage();
    expect(await spaceEventUpdatePage.getPageTitle()).to.eq('spaceApp.spaceEvent.home.createOrEditLabel');
    await spaceEventUpdatePage.cancel();
  });

  it('should create and save SpaceEvents', async () => {
    const nbButtonsBeforeCreate = await spaceEventComponentsPage.countDeleteButtons();

    await spaceEventComponentsPage.clickOnCreateButton();

    await promise.all([
      spaceEventUpdatePage.setNameInput('name'),
      spaceEventUpdatePage.setDateInput('2000-12-31'),
      spaceEventUpdatePage.setDescriptionInput('description'),
      spaceEventUpdatePage.setPhotoInput(absolutePath),
      spaceEventUpdatePage.typeSelectLastOption(),
      spaceEventUpdatePage.missionSelectLastOption(),
    ]);

    expect(await spaceEventUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await spaceEventUpdatePage.getDateInput()).to.eq('2000-12-31', 'Expected date value to be equals to 2000-12-31');
    expect(await spaceEventUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await spaceEventUpdatePage.getPhotoInput()).to.endsWith(
      fileNameToUpload,
      'Expected Photo value to be end with ' + fileNameToUpload
    );

    await spaceEventUpdatePage.save();
    expect(await spaceEventUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await spaceEventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SpaceEvent', async () => {
    const nbButtonsBeforeDelete = await spaceEventComponentsPage.countDeleteButtons();
    await spaceEventComponentsPage.clickOnLastDeleteButton();

    spaceEventDeleteDialog = new SpaceEventDeleteDialog();
    expect(await spaceEventDeleteDialog.getDialogTitle()).to.eq('spaceApp.spaceEvent.delete.question');
    await spaceEventDeleteDialog.clickOnConfirmButton();

    expect(await spaceEventComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
