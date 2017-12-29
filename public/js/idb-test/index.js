import idb from 'idb';

var dbPromise = idb.open('test-db', 3, function(upgradeDb) {
  switch (upgradeDb.oldVersion) {
    case 0:
      var keyValStore = upgradeDb.createObjectStore('keyval');
      keyValStore.put("world", "hello");
      //break;<-- we don't need it 
    case 1:
      upgradeDb.createObjectStore('people', { keyPath: 'name' });
    case 2:
      var peopleStore = upgradeDb.transaction.objectStore('people');
      peopleStore.createIndex('animal', 'favoriteAnimal');
      //upgradeDb.createObjectStore('people', { keyPath: 'name' });
  }

});

// read "hello" in "keyval"
dbPromise.then(function(db) {
  var tx = db.transaction('keyval');
  var keyValStore = tx.objectStore('keyval');
  return keyValStore.get('hello');
}).then(function(val) {
  console.log('The value of "hello" is:', val);
});

// set "foo" to be "bar" in "keyval"
dbPromise.then(function(db) {
  var tx = db.transaction('keyval', 'readwrite');
  var keyValStore = tx.objectStore('keyval');
  keyValStore.put('bar', 'foo');
  return tx.complete;
}).then(function() {
  console.log('Added foo:bar to keyval');
});

dbPromise.then(function(db) {
  // TODO: in the keyval store, set
  // "favoriteAnimal" to your favourite animal
  // eg "cat" or "dog"
  var tx = db.transaction('keyval', 'readwrite');
  var keyValStore = tx.objectStore('keyval');
  keyValStore.put('cat', 'favoriteAnimal');
  return tx.complete;
}).then(function() {
  console.log('Added favoriteAnimal:cat to keyval');
});

dbPromise.then(function(db) {
  var tx = db.transaction('people', 'readwrite');
  var peopleStore = tx.objectStore('people');

  peopleStore.put({
    name: 'Jérémie Litzler',
    age: 30,
    favoriteAnimal: 'Cheetath'
  });
  peopleStore.put({
    name: 'Aurélie Litzler',
    age: 31,
    favoriteAnimal: 'Cat'
  });
  peopleStore.put({
    name: 'Léyla Litzler',
    age: 3,
    favoriteAnimal: 'Cat'
  });
  peopleStore.put({
    name: 'Alyssia Litzler',
    age: 3,
    favoriteAnimal: 'Sheep'
  });
  peopleStore.put({
    name: 'Nicolas Lécluse',
    age: 28,
    favoriteAnimal: 'Dog'
  });

  return tx.complete;
}).then(function() {
  console.log('Person added!');
});

dbPromise.then(function(db) {
  var tx = db.transaction('people');
  var peopleStore = tx.objectStore('people');
  var animalIndex = peopleStore.index('animal');

  return animalIndex.getAll();
}).then(function(people) {
  console.log(people);
});
