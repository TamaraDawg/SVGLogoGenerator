// Import dependencies
const inquirer = require('inquirer');
const fs = require('fs');

class Shape {
  constructor() {
    this.color = 'black';
    this.text = '';
    this.textColor = 'black';
  }

  setColor(color) {
    this.color = color;
  }

  setText(text) {
    this.text = text;
  }

  setTextColor(textColor) {
    this.textColor = textColor;
  }

  render() {
    return ''; // Default implementation, override in child classes
  }
}

class Triangle extends Shape {
  render() {
    return `
      <polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />
      <text x="150" y="100" fill="${this.textColor}" text-anchor="middle">${this.text}</text>
    `;
  }
}

class Circle extends Shape {
  render() {
    return `
      <circle cx="100" cy="100" r="80" fill="${this.color}" />
      <text x="100" y="100" fill="${this.textColor}" text-anchor="middle" alignment-baseline="central">${this.text}</text>
    `;
  }
}

class Square extends Shape {
  render() {
    return `
      <rect x="50" y="50" width="200" height="200" fill="${this.color}" />
      <text x="150" y="150" fill="${this.textColor}" text-anchor="middle" alignment-baseline="central">${this.text}</text>
    `;
  }
}

function createLogoFile(svgContent) {
  const svgString = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      ${svgContent}
    </svg>`;

  fs.writeFileSync('logo.svg', svgString);
  console.log('Generated logo.svg');
}


async function promptUser() {
  const { text, textColor, shape, shapeColor } = await inquirer.prompt([
    {
      name: 'text',
      message: 'Enter up to three characters:',
      validate: (input) => input.length <= 3,
    },
    {
      name: 'textColor',
      message: 'Enter the text color:',
      default: 'black',
    },
    {
      name: 'shape',
      message: 'Choose a shape:',
      type: 'list',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      name: 'shapeColor',
      message: 'Enter the shape color:',
      default: 'black',
    },
  ]);

  const shapeInstance = createShapeInstance(shape);
  shapeInstance.setColor(shapeColor);
  shapeInstance.setText(text);
  shapeInstance.setTextColor(textColor);

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      ${shapeInstance.render()}
    </svg>
  `;

  createLogoFile(svgContent);
}

function createShapeInstance(shape) {
  switch (shape) {
    case 'circle':
      return new Circle();
    case 'triangle':
      return new Triangle();
    case 'square':
      return new Square();
    default:
      throw new Error('Invalid shape');
  }
}

promptUser();
