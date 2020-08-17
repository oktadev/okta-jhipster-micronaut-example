# Micronaut + Angular with JHipster

This example app shows how to build a basic space launch and landing application with Micronaut, Angular, and JHipster (and Angular 10). Please read [Build a Secure Micronaut and Angular App with JHipster](https://developer.okta.com/blog/2020/08/17/micronaut-jhipster-heroku) to see how to deploy it to Heroku.

**Prerequisites:**

- [Node 12](https://nodejs.org/)+
- [Java 11](https://adoptopenjdk.net/)+
- [Docker](https://docs.docker.com/get-docker/)

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

- [Getting Started](#getting-started)
- [Links](#links)
- [Help](#help)
- [License](#license)

## Getting Started

To install this example application, run the following commands:

```bash
git clone https://github.com/oktadeveloper/okta-jhipster-micronaut-example.git
cd okta-jhipster-micronaut-example
```

You can also create it by installing Micronaut for JHipster, JHipster, and importing the `space` JDL.

```
npm i -g generator-jhipster generator-jhipster-micronaut
mkdir spacefan && cd spacefan
jhipster jdl space
```

Start Keycloak in a Docker container:

```
docker-compose -f src/main/docker/keycloak.yml up -d
```

Then, start the app.

```
./mvnw
```

You'll be able to login with `admin/admin`.

### Use Okta for Authentication

If you'd like to use Okta instead of Keycloak, you'll need to change a few things. First, install the [Okta CLI](https://github.com/oktadeveloper/okta-cli) and run `okta register` to create an account.

Once you've verified your account, run `okta apps create`. Select **Web** > **JHipster**, and the pre-selected Redirect URI. You should see output like the following:

```
$ okta apps create
Application name [okta-jhipster-micronaut-example]:
Type of Application
(The Okta CLI only supports a subset of application types and properties):
> 1: Web
> 2: Single Page App
> 3: Native App (mobile)
> 4: Service (Machine-to-Machine)
Enter your choice [Web]: 1
Type of Application
> 1: Okta Spring Boot Starter
> 2: Spring Boot
> 3: JHipster
> 4: Other
Enter your choice [Other]: 3
Redirect URI
Common defaults:
 Spring Security - http://localhost:8080/login/oauth2/code/okta
 JHipster - http://localhost:8080/login/oauth2/code/oidc
Enter your Redirect URI [http://localhost:8080/login/oauth2/code/oidc]:
Configuring a new OIDC Application, almost done:
Created OIDC application, client-id: 0oaqbdkbtdli58K3k4x6
Creating Authorization Server claim 'groups':
-
Okta application configuration has been written to: /Users/mraible/dev/okta/okta-jhipster-micronaut-example/.okta.env
```

The Okta CLI [has not been updated to recognize the Micronaut blueprint](https://github.com/oktadeveloper/okta-cli/issues/29), therefore, you need to edit `.okta.env` and change the property names to the following:

```
MICRONAUT_SECURITY_OAUTH2_CLIENTS_OIDC_OPENID_ISSUER=https://{yourOktaDomain}/oauth2/default
MICRONAUT_SECURITY_OAUTH2_CLIENTS_OIDC_CLIENT_ID={yourClientID}
MICRONAUT_SECURITY_OAUTH2_CLIENTS_OIDC_CLIENT_SECRET={yourClientSecret}
```

Source the `.okta.env` file to override the default OIDC settings in JHipster, and start your app.

```
source .okta.env && ./mvnw
```

Open your browser to <http://localhost:8080>, click **sign in**, and authenticate with Okta!

If you'd like to see how to setup JHipster + Okta without using the Okta CLI, see [the JHipster security documentation](https://www.jhipster.tech/security/#oauth2).

You can also just use `mhipster heroku` and configure Okta as part of deploying to Heroku. This repo's [blog post](https://developer.okta.com/blog/2020/08/17/micronaut-jhipster-heroku) shows you how to do that.

## Links

This example uses the following open source libraries, which is sponsored by Okta:

- [Angular](https://angular.io)
- [JHipster](https://jhipster.tech)
- [Micronaut](https://micronaut.io)

## Help

Please post any questions as comments on the [blog post](https://developer.okta.com/blog/2020/08/17/micronaut-jhipster-heroku), or visit our [Okta Developer Forums](https://devforum.okta.com/). You can also ask them on [Stack Overflow with the `jhipster` tag](https://stackoverflow.com/tags/jhipster).

## License

Apache 2.0, see [LICENSE](LICENSE).
