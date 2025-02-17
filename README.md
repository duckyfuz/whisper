
# Whisper - React Snackbar System

A lightweight and fully customizable React snackbar (toast) system built with **Framer Motion** and **TailwindCSS**.

## ✨ Features

- **Instant API:** Simple and intuitive API - see below.

- **Customizable:** Easy-to-read code and fully styled with TailwindCSS, allowing you to extend and modify the system as you need.

- **Multiple Notification Types:** Supports `success`, `warning`, `error`, `info`, and `default` types.

- **Flexible Positioning:** Display snacks in six different positions.

- **Auto & Manual Dismissal:** In addition to auto-dismiss timers (default: 6 seconds), you can allow users to manually close snacks.

- **Actionable Buttons:** Attach actions to snacks with custom labels.

- **Descriptive Snacks:** Add a secondary description below the main message for more context.

- **Icon Support:** Built-in icons for different snack types and support for custom icons.

- **Stackable Alerts:** Maintain a queue of snacks with a configurable max count (default: 6), and clear them all with a provided function.

## 💻 Installation

There is no npm package, it's just 1 file you can fully customize. Download the single file of code (`src/app/snackbar-context.tsx`), add it to your project, and wrap your app with the context provider.

```
<SnackbarProvider>
...
</SnackbarProvider>
```

You will also need to install the package dependencies.

```
npm install framer-motion
npm install tailwindcss
```

## ⚙️ Usage

**Recommended:** To explore all of the available snack types and options (along with their respective code snippets), please check out the demo playground.

<ins>All API functions accept two parameters:</ins>

- Message (string): The main text of the snackbar.
- Options (object, optional): Customize the snackbar’s behavior and appearance.

### Snack Types

```
snackbar("You have arrived at the Royal Museum");
snackbar.info("Your mission is to steal the Yaz Diamond");
snackbar.success("You successfully snuck past security");
snackbar.warning("You have 5m before the alarm is triggered");
snackbar.error("Mission failed, you were spotted");
snackbar.clear();
```

### Snack Options (Examples)

```
{
  action: { label: 'Undo', onClick: () => {} },
  description: "Saul Goodman will be representing you",
  dismissable: true,
  duration: 6000,
  icon: <ClockIcon />,
}
```

## 🔮 Contribution

If you wish to contribute to this project, clone the repo and run it locally using 

```
npm run dev
```

