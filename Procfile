web: java $JAVA_OPTS -Xmx128m -Dmicronaut.env.deduction=false -Dmicronaut.environments=prod,cloud,no-liquibase,heroku -jar target/space*.jar
release: cp -R src/main/resources/config config && ./mvnw -ntp liquibase:update -Pprod,heroku
