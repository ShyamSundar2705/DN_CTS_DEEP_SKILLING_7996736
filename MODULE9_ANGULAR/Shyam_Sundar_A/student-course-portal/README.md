# Student Course Portal

Cognizant Digital Nurture 5.0 — Angular Hands-On project (Hands-On 1 through 10). Built with [Angular CLI](https://github.com/angular/angular-cli) version 20.3.32 using standalone components.

## Features

- Routing with lazy-loaded feature routes (`courses`, `enroll`, `add-course`, `profile`)
- Route guards: `authGuard` (route protection) and `unsavedChangesGuard` (`CanDeactivate`)
- HTTP interceptors: auth, loading, and error handling
- `CourseService` backed by a JSON Server REST API (`db.json`)
- NgRx Store + Effects for course and enrollment state
- Template-driven and reactive forms with custom sync/async validators
- Custom `HighlightDirective` and `CreditLabelPipe`
- Reusable UI components: header, breadcrumb, course card, course summary widget, loading spinner, notification
- Unit tests (Jasmine/Karma) for components, services, guards, interceptors, reducers, selectors, effects, pipes, and directives

## Development server

Start the Angular app:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app reloads automatically on source changes.

The `CourseService` talks to a local JSON Server API. Run it in a separate terminal:

```bash
npm run api
```

This serves `db.json` at `http://localhost:3000`.

## Code scaffolding

To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

```bash
ng build
```

Build artifacts are stored in the `dist/` directory. The production build optimizes for performance and speed.

## Running unit tests

```bash
ng test
```

With coverage:

```bash
ng test --watch=false --code-coverage
```

## Running end-to-end tests

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Project structure

```
src/app/
├── components/       # Reusable UI components (header, breadcrumb, course-card, ...)
├── directives/        # HighlightDirective
├── features/enrollment/  # Lazy-loaded enrollment feature routes
├── guards/            # authGuard, unsavedChangesGuard
├── interceptors/       # auth, error, loading interceptors
├── models/             # Course model
├── pages/              # Routed page components
├── pipes/              # CreditLabelPipe
├── services/            # auth, course, enrollment, loading, notification
├── store/               # NgRx store: course and enrollment feature slices
└── validators/          # Custom sync/async form validators
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
