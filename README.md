<div align="center">

## Ball in a hole

</div>

### Opis gry:
Gra na smartphone, jedna piłka wiele dziurek. Przejście kulką przez całe pole dziur tak aby trafić w potrzebną. Z każdym kolejnym levelem sterowanie piłką będzie coraz trudniejsze.

Interakcja urzytkownika w grze będzie zaimplementowana przy pomocy Gyroscope Sensor API.

#### Przykładowe klasy które będą użyte w aplikacji:

 - Class **CanvasBoard** - planszówka gry na canvasie, renderuje wszystkie elementy graficzne;

 - Class **Game** - obiekt tej klasy będzie odpowiadał za całą logikę gry i jej stanów;

 - Class **Device** - obiek tej klasy będzie odpowiadał za interakcję z urządzeniem mobilnym (sensor hyroskopu, rozmiar ekranu i orientacja); 

 - Class **DOM** - obiekt tej klasy będzie odpowiadał za interakcje aplikacji z DOM API przeglądarki, w tym popupy z komunikatami;  

 - Class **Ball** - na podtawie tej klasy będzie się tworzyła piłka;

 - Class **Hole** - na podtawie tej klasy będą się tworzyły dziury (połapki); 

 - Class **Finish** - na podstawie tej klasy będzie się tworzyła dziura do której trzeba trafić piłką.
