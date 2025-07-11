# Creación de ramas en GIT

1. Antes de crear cualquier rama, haz un pull de main para asegurarte de que no haya cambios pendientes.
2. Ahora creas una rama con `git branch <nombre_rama>`
3. Te CAMBIAS A ESA RAMA con `git switch <nombre_rama>`
   1. Para crear una nueva rama y cambiar a ella, usas `git switch -c <nombre_rama>`
4. Haces los cambios que quieras en la rama y luego haces un commit con `git commit -m "mensaje o comentario"`
5. Cuando has terminado, subes esa rama a tu repositorio remoto con `git push origin <nombre_rama>` para hacer un pull request
      1. Una vez subida la rama, te vas a tu github y verás un botón de "pull request" en la parte superior derecha de la pantalla.
      2. Inicias el pull request con comentarios y descripción.
      3. Otra persona revisará tu pull request y si todo es correcto, podrá aceptarlo y se hará un `merge` de la rama a la rama main.

**IMPORTANTE, NOMENCLATURA**
Para nombrar las ramas lo haremos así:

## Basic rules

- Lowercase and Hyphen-separated: Stick to lowercase for branch names and use hyphens to separate words. For instance, feature/new-login or bugfix/header-styling.
- Alphanumeric Characters: Use only alphanumeric characters (a-z, A-Z, 0–9) and hyphens. Avoid punctuation, spaces, underscores, or any non-alphanumeric character.
No Continuous Hyphens: Do not use continuous hyphens. feature--new-login can be confusing and hard to read.
- No Trailing Hyphens: Do not end your branch name with a hyphen. For example, feature-new-login- is not a good practice.
- Descriptive: The name should be descriptive and concise, ideally reflecting the work done on the branch.

## Branch Prefixes

NOSOTRAS PONDREMOS EL PRIMER PREFIJO NUESTRO NOMBRE

- Using prefixes in branch names helps to quickly identify the purpose of the branches. Here are some common types of branches with their corresponding prefixes:

- Feature Branches: These branches are used for developing new features. Use the prefix feature/. For instance, feature/login-system.
  
- Bugfix Branches: These branches are used to fix bugs in the code. Use the prefix bugfix/. For example, bugfix/header-styling.
  
- Hotfix Branches: These branches are made directly from the production branch to fix critical bugs in the production environment. Use the prefix hotfix/. For instance, hotfix/critical-security-issue.
  
- Release Branches: These branches are used to prepare for a new production release. They allow for last-minute dotting of i’s and crossing t’s. Use the prefix release/. For example, release/v1.0.1.

- Documentation Branches: These branches are used to write, update, or fix documentation eg. the README.md file. Use the prefix docs/. For instance, docs/api-endpoints.

## Sample Branch Names 

Here are some samples of good branch names following the above conventions:

- nastya/feature/T-456-user-authentication
- andrea/bugfix/T-789-fix-header-styling
- raquel/hotfix/T-321-security-patch
- lydia/release/v2.0.1
- nastya/docs/T-654-update-readme