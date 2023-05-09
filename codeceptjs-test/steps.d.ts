/// <reference types='codeceptjs' />

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    current: any;
  }

  interface CustomLocators {
    data: { data: string };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface I extends WithTranslation<Methods> {}

  namespace Translation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Actions {}
  }
}
