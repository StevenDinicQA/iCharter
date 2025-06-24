import User from "@/types/user/User";
import mixpanel from "mixpanel-browser";

class MixpannelService {
  private mixpanelToken: string;
  private ostMixpanelToken: string;

  constructor() {
    this.mixpanelToken = process.env.MIXPANEL_TOKEN || "";
    this.ostMixpanelToken = process.env.OST_MIXPANEL || "";

    // We need to initialize mixpannel twice, one to track oneseven's customers
    if (!this.mixpanelToken) return;
    mixpanel.init(
      this.mixpanelToken,
      {
        persistence: "localStorage",
      },
      "customer"
    );

    // And another for oneSeven's internal use
    if (!this.ostMixpanelToken) return;
    mixpanel.init(
      this.ostMixpanelToken,
      {
        persistence: "localStorage",
      },
      "ost"
    );
  }

  identifyUser(user: User) {
    if (this.mixpanelToken) {
      this.identifyUserCustomer(user);
    }
    if (this.ostMixpanelToken) {
      this.identifyUserOst(user);
    }
  }

  private async identifyUserCustomer(user: User) {
    const mp = mixpanel as any;

    mp.customer.identify(user.email);
    mp.customer.people.set_once({
      $name: `${user.name} ${user.lastName}`,
      $email: user!.email,
    });
  }

  private async identifyUserOst(user: User) {
    const mp = mixpanel as any;

    mp.ost.identify(user.email);
    mp.ost.people.set_once({
      $name: `${user.name} ${user.lastName}`,
      $email: user!.email,
    });
  }

  async trackEvent(eventName: string, eventProperties?: Record<string, any>) {
    if (this.mixpanelToken) {
      await this.trackEventCustomer(eventName, eventProperties);
    }
    if (this.ostMixpanelToken) {
      await this.trackEventOst(eventName, eventProperties);
    }
  }

  private async trackEventCustomer(
    eventName: string,
    eventProperties?: Record<string, any>
  ) {
    const mp = mixpanel as any;
    mp.customer.track(eventName, eventProperties);
  }

  private async trackEventOst(
    eventName: string,
    eventProperties?: Record<string, any>
  ) {
    const mp = mixpanel as any;
    mp.ost.track(eventName, eventProperties);
  }
}

export const mixPannelService = new MixpannelService();
