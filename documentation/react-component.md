# REACT COMPONENTS

In this documentation file, you can find informations about the components you can use in React and React-Native in this project.
They are pretty much customizable, so if you need a precise component, read is props, maybe it could avoid you to create a new component.

## REACT NATIVE ( Mobile )

### AreaButton Component

The AreaButton is a customizable button component for React Native applications.

> Props

- onPress (function): A function to be called when the button is pressed.

- title (string): The text to be displayed on the button.

- disabled (boolean, optional): If true, the button will be disabled.

- backgroundColor (string, optional): The background color of the button. Default is #F5F5F5.

- textColor (string, optional): The color of the text on the button. Default is #1F1F1F.

- icon (any, optional): An image source for an icon to be displayed on the button.

- activeOpacity (number, optional): Determines what the opacity of the wrapped view should be when touch is active. Default is 0.2.

> Usage

```TSX
import AreaButton from './AreaButton';

<AreaButton 
  onPress={() => console.log('Button pressed!')}
  title="Press Me"
  disabled={false}
  backgroundColor="#FF6347"
  textColor="#FFFFFF"
  icon={require('./path/to/icon.png')}
  activeOpacity={0.7}
/>
```

In this example, the AreaButton component is imported from its file location.
An AreaButton is then rendered with custom onPress, title, disabled, backgroundColor, textColor, icon, and activeOpacity props.
When the button is pressed, "Button pressed!" will be logged to the console. ( But any function can be assigned. )

### MiniFlow Component

The MiniFlow is a customizable component for React Native applications that can display in two sizes: big and mini.

> Props

- onPress (function): A function to be called when the component is pressed.

- title (string): The text to be displayed on the component.

- icon (any): An image source for an icon to be displayed on the component.

- disabled (boolean, optional): If true, the component will be disabled.

- backgroundColor (string, optional): The background color of the component. Default is #1F1F1F.

- textColor (string, optional): The color of the text on the component. Default is #1F1F1F.

- big_display (boolean, optional): If true, the component will display in a larger size. If false, it will display in a smaller size.

> Usage

```TSX
import MiniFlow from './MiniFlow';

<MiniFlow 
  onPress={() => console.log('Component pressed!')}
  title="Press Me"
  icon={require('./path/to/icon.png')}
  disabled={false}
  backgroundColor="#FF6347"
  textColor="#FFFFFF"
  big_display={true}
/>
```

In this example, the MiniFlow component is imported from its file location. A MiniFlow is then rendered with custom onPress, title, icon, disabled, backgroundColor, textColor, and big_display props. When the component is pressed, "Component pressed!" will be logged to the console.

### Flow Component

The Flow is a customizable component for React Native applications that displays a list of icons and a description.

> Props

- onPress (function): A function to be called when the component is pressed.

- title (string): The text to be displayed on the component.

- icons (array): An array of image sources for icons to be displayed on the component.

- disabled (boolean, optional): If true, the component will be disabled.

- backgroundColor (string, optional): The background color of the component. Default is #1F1F1F.

- textColor (string, optional): The color of the text on the component. Default is #1F1F1F.

- description (string): The description to be displayed on the component.

> Usage

```TSX
import Flow from './Flow';

<Flow 
  onPress={() => console.log('Component pressed!')}
  title="Press Me"
  icons={[require('./path/to/icon1.png'), require('./path/to/icon2.png')]}
  disabled={false}
  backgroundColor="#FF6347"
  textColor="#FFFFFF"
  description="This is a description"
/>
```

In this example, the Flow component is imported from its file location. A Flow is then rendered with custom onPress, title, icons, disabled, backgroundColor, textColor, and description props. When the component is pressed, "Component pressed!" will be logged to the console.

### Switch Component

The Switch is a customizable component for React Native applications that acts as a toggle switch.

> Props

- backgroundColor (string, optional): The background color of the switch. Default is #E7E7E7.

- offColor (string, optional): The color of the switch when it's off.

- onColor (string, optional): The color of the switch when it's on.

- onSwitch (function): A function to be called when the switch is toggled.

- status (boolean, optional): The initial status of the switch. If true, the switch is on. If false, the switch is off.

- disabled (boolean, optional): If true, the switch will be disabled.

> Usage

```TSX
import Switch from './Switch';

<Switch 
  backgroundColor="#FF6347"
  offColor="#FFFFFF"
  onColor="#000000"
  onSwitch={() => console.log('Switch toggled!')}
  status={false}
  disabled={false}
/>
```

In this example, the Switch component is imported from its file location. A Switch is then rendered with custom backgroundColor, offColor, onColor, onSwitch, status, and disabled props. When the switch is toggled, "Switch toggled!" will be logged to the console.

### TextBox Component

The TextBox is a customizable component for React Native applications that acts as a text input field.

> Props

- placeholder (string, optional): The placeholder text for the text input field.

- onChangeText (function): A function to be called when the text in the text input field is changed.

- value (string): The current value of the text input field.

- hideText (boolean, optional): If true, the text input field will hide the text entered (like a password field).

- autocomplete (any, optional): Autocomplete options for the text input field.

> Usage

```TSX
import TextBox from './TextBox';

<TextBox 
  placeholder="Enter text here"
  onChangeText={(text) => console.log(text)}
  value=""
  hideText={true}
  autocomplete="off"
/>
```

In this example, the TextBox component is imported from its file location. A TextBox is then rendered with custom placeholder, onChangeText, value, hideText, and autocomplete props. When the text in the text input field is changed, the new text will be logged to the console.

## REACT ( Web )

### AreaButton Component

The AreaButton is a customizable component for React web applications that acts as a button.

> Props

- onPress (function): A function to be called when the button is pressed.

- title (string): The text to be displayed on the button.

- disabled (boolean, optional): If true, the button will be disabled.

- backgroundColor (string, optional): The background color of the button.

- textColor (string, optional): The color of the text on the button.

- icon (any, optional): An image source for an icon to be displayed on the button.

- border (boolean, optional): If true, the button will have a border.

> Usage

import AreaButton from './AreaButton';

```TSX
<AreaButton 
  onPress={() => console.log('Button pressed!')}
  title="Press Me"
  disabled={false}
  backgroundColor="#FF6347"
  textColor="#FFFFFF"
  icon={require('./path/to/icon.png')}
  border={true}
/>
```

In this example, the AreaButton component is imported from its file location. An AreaButton is then rendered with custom onPress, title, disabled, backgroundColor, textColor, icon, and border props. When the button is pressed, "Button pressed!" will be logged to the console.

### AreaMiniFlow Component

The AreaMiniFlow is a customizable component for React web applications that acts as a clickable area with an icon and title.

> Props
- onPress (function): A function to be called when the component is pressed.

- title (string): The text to be displayed on the component.

- icon (any): An image source for an icon to be displayed on the component.

- disabled (boolean, optional): If true, the component will be disabled.

- backgroundColor (string, optional): The background color of the component.

- textColor (string, optional): The color of the text on the component.

- hide_title (boolean, optional): If true, the title will be hidden.

> Usage

```TSX
import AreaMiniFlow from './AreaMiniFlow';

<AreaMiniFlow 
  onPress={() => console.log('Component pressed!')}
  title="Press Me"
  icon={require('./path/to/icon.png')}
  disabled={false}
  backgroundColor="#FF6347"
  textColor="#FFFFFF"
  hide_title={false}
/>
```

In this example, the AreaMiniFlow component is imported from its file location. An AreaMiniFlow is then rendered with custom onPress, title, icon, disabled, backgroundColor, textColor, and hide_title props. When the component is pressed, "Component pressed!" will be logged to the console.

### AreaFlow Component

The AreaFlow is a customizable component for React web applications that acts as a clickable area with an icon, title, and description.

> Props

- onPress (function): A function to be called when the component is pressed.

- title (string): The text to be displayed as the title on the component.

- icons (any): An image source or an array of image sources for icons to be displayed on the component.

- disabled (boolean, optional): If true, the component will be disabled.

- backgroundColor (string, optional): The background color of the component.

- textColor (string, optional): The color of the text on the component.

- description (string): The text to be displayed as the description on the component.

> Usage

```TSX
import AreaFlow from './AreaFlow';

<AreaFlow 
  onPress={() => console.log('Component pressed!')}
  title="Press Me"
  icons={[require('./path/to/icon1.png'), require('./path/to/icon2.png')]}
  disabled={false}
  backgroundColor="#FF6347"
  textColor="#FFFFFF"
  description="This is a description"
/>
```

In this example, the AreaFlow component is imported from its file location. An AreaFlow is then rendered with custom onPress, title, icons, disabled, backgroundColor, textColor, and description props. When the component is pressed, "Component pressed!" will be logged to the console.

### AreaTextBox Component

The AreaTextBox is a customizable component for React web applications that acts as a text input field.

> Props

- placeholder (string, optional): The placeholder text for the text input field.

- onChangeText (function): A function to be called when the text in the text input field is changed.

- value (string): The current value of the text input field.

- hideText (boolean, optional): If true, the text input field will hide the text entered (like a password field).

- autocomplete (any, optional): Autocomplete options for the text input field.

- disabled (boolean, optional): If true, the text input field will be disabled.

- backgroundColor (string, optional): The background color of the text input field.

- customwidth (number, optional): The custom width of the text input field.

> Usage

```TSX
import AreaTextBox from './AreaTextBox';

<AreaTextBox 
  placeholder="Enter text here"
  onChangeText={(text) => console.log(text)}
  value=""
  hideText={true}
  autocomplete="off"
  disabled={false}
  backgroundColor="#F5F5F5"
  customwidth={200}
/>
```

In this example, the AreaTextBox component is imported from its file location. An AreaTextBox is then rendered with custom placeholder, onChangeText, value, hideText, autocomplete, disabled, backgroundColor, and customwidth props. When the text in the text input field is changed, the new text will be logged to the console.

### AreaNavigationBar Component

The AreaNavigationBar is a customizable component for React web applications that acts as a navigation bar.

> Props

- name (string): The name to be displayed on the navigation bar.

- notifications (boolean, optional): If true, a notifications icon will be displayed on the navigation bar.

> Usage

```TSX
import AreaNavigationBar from './AreaNavigationBar';

<AreaNavigationBar 
  name="Home"
  notifications={true}
/>
```

In this example, the AreaNavigationBar component is imported from its file location. An AreaNavigationBar is then rendered with custom name and notifications props. The navigation bar will display the name "Home" and a notifications icon.

The navigation bar has a hamburger menu that can be opened to reveal links to different pages. The links are set to navigate to "/home", "/flows", and "/forger" when clicked. The navigation bar also has a logo and a profile icon. If the notifications prop is set to true, a notifications icon will also be displayed.