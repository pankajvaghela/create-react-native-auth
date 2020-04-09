# Android patch 

## gradle file patch

Following assumption that mavenLocal is first in repositories;

reason : Not able to match bracket pairs in regex

```gradle
allprojects {
    repositories {
        mavenLocal()

        ...
    }
}
```
