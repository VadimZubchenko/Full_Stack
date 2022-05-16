function Universe() {
  var instance;
  Universe = function Universe() {
    return instance;
  };
  // how to make itsenäisiä ketjuja from same prototype.
  Universe.prototype = this;
  instance = new Universe();
  instance.constructor = Universe;
  instance.size = 0;
  instance.bang = "Big";
  return instance;
}

function start() {
  let HelloWorld = function () {
    this.name = "World";
    this.message = "Hello";
  };
  // made prototype of HelloWorld
  let helloInstance = new HelloWorld();
  console.log(helloInstance);
  // here we change helloWord object's name and add new message
  HelloWorld.prototype.name = "Jaska";
  HelloWorld.prototype.message2 = "Goodbye";
  // althoug the name's been changed, will be used for print name of father of proto HelloWorld.
  console.log(helloInstance.name);
  console.log(helloInstance.message2);

  let functionTest = {
    myVar: 10,
    myFunction: function () {
      return this.myVar + 10;
    },
  };

  console.log(functionTest);

  let object1 = Object.create(functionTest);
  let object2 = Object.create(functionTest);

  object1.myVar = 15;
  object2.myVar = 100;
  console.log(object1.myFunction);
  console.log(object2.myFunction);

  console.log(object1);
  console.log(object2);
  // yhdesta allemmaista objektissa muuttuu dynamicly all prototype object
  functionTest.myVar = 50; // from which start branches

  Universe.prototype.nothing = true;
  let uni1 = new Universe();
  console.log(uni1.nothing);

  Universe.prototype.everything = false;
  console.log(uni1.everything);
  let uni2 = new Universe();
  console.log(uni2.nothing);
  console.log(uni2.everything);
  // uni1 ja uni2 ovat täysi kaksi eri objektia from same prototype
  console.log(uni1);
  console.log(uni2);
}
