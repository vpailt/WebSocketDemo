/**
 * Created by valentinpitel on 22/11/2016.
 */
// import * as model from './model';

class Data {
    constructor(){
        this.tab = [];
    };
}
function ExceptionType(message){
    this.message = message;
    this.name = "ExceptionType";
}
function TypeSensor(data){
    switch(data.type) {
        case 'DOOR':
            return new Door(data);
        case 'TEMPERATURE':
            return new Temperature(data);
        case 'FAN_SPEED':
            return new Fan_speed(data);
        case 'PERCENT':
            return new Percent(data);
        case 'POSITIVE_NUMBER':
            return new Temperature(data);
        case 'ON_OFF':
            return new Switch(data);
        case 'OPEN_CLOSE':
            return new Switch(data);
    }
}
class TimeSeries extends Data {
    constructor(values, labels) {
        super();
        if(Array.isArray(values) == false)
            throw 'values should be an array';
        if(Array.isArray(labels) == false)
            throw 'labels should be an arrays';
        if(values.length != labels.length)
            throw 'values and labels arrays must have the same length'
        for(let i=0;i<values.length;i++) {
          //  if (Number.isInteger(values[i]) == false)
           //     throw new ExceptionType("Values should be integers");
            if (typeof labels[i] != 'string')
                throw new ExceptionType('Labels should be strings');
        }
        this.tab.push(values);
        this.tab.push(labels);
    }
    get values() {
        return this.tab[0] || 0;
    }
    set values(val) {
        this.tab[0] = val;
    }
    set labels(val) {
        this.tab[1] = val;
    }
    get labels() {
        return this.tab[1] || 0;
    }
    toString() {
        return (`([${this.values}],[${this.labels}])`);
    }
}
class Datum extends Data {
    constructor(value) {
        super();
/*
        if (Number.isInteger(value) == false)
            throw new ExceptionType("Value should be integer");
*/
        this.tab.push(value);
    }
    get value() {
        return this.tab[0] || 0;
    }
    set value(val) {
        this.tab[0] = val;
    }
    toString() {
        return (`(${this.value})`);
    }
}
class Sensor {
    constructor(data) {
        this.tab = [];
       /* if (Number.isInteger(data.id) == false)
            throw new ExceptionType("Id should be integer");*/
        this.tab.push(data.id);
        if (typeof data.name  != 'string')
            throw new ExceptionType("Name should be string");
        this.tab.push(data.name);
        if(data.data.value===undefined)
            this.tab.push(new TimeSeries(data.data.values,data.data.labels));
        else
            this.tab.push(new Datum(data.data.value));
    }
    get id() {
        return this.tab[0] || 0;
    }
    set id(val) {
        this.tab[0] = val;
    }
    get name() {
        return this.tab[1] || '';
    }
    set name(val) {
        this.tab[1] = val;
    }
    get data() {
        return this.tab[2] || {};
    }
    set data(val) {
        this.tab[2] = val;
    }
    toString() {
        return (`(${this.id},${this.name},${this.data})`);
    }
}
class Temperature extends Sensor {
    constructor(data) {
        super(data);
        this.data.value+="°C";
    }
    toString() {
        return (`(${this.id},${this.name},${this.data}degré)`);
    }

}
class Percent extends Sensor {
    constructor(data) {
        super(data);
        this.data.value=Math.round(parseFloat(this.data.value)*1000)/10+"%";

    }

    toString() {
        var value=0;

       // if(this.data!=="0")
       // value=Math.round(parseFloat(this.data.value)*1000)/10;
        return (`(${this.id},${this.name},${this.data})`);
    }


}
class Humidity extends Sensor {
    constructor(data) {
        super(data);
    }
}
class Light extends Sensor {
    constructor(data) {
        super(data);
    }
}
class Switch extends Sensor {
    constructor(data) {
        super(data);
    }
}
class Door extends Sensor {
    constructor(data) {
        super(data);
    }
}
class Fan_speed extends Sensor {
    constructor(data) {
        super(data);
    }
}
var SensorType = Object.freeze({
    TEMPERATURE: 1,
    HUMIDITY: 2,
    LIGHT: 3,
    SWITCH : 4,
    DOOR : 5,
    FAN_SPEED : 6
});
/*
 const  data = [
 {
 "id": 1234,
 "name": "Température Bureau",
 "type": "TEMPERATURE",
 "data": {
 "values": [23,23,22,21,23,23,23,25,25],
 "labels": ["2016-10-19T08:00:00.000Z", "2016-10-19T09:00:00.000Z", "2016-10-19T10:00:00.000Z", "2016-10-19T11:00:00.000Z", "2016-10-19T12:00:00.000Z","2016-10-19T13:00:00.000Z","2016-10-19T14:00:00.000Z","2016-10-19T15:00:00.000Z","2016-10-19T16:00:00.000Z"]
 }
 },
 {
 "id": 10245,
 "name": "Porte du Garage",
 "type": "DOOR",
 "data": {
 "value": 0
 }
 },
 {
 "id": 2222,
 "name": "Ventilateur Ordinateur Bureau",
 "type": "FAN_SPEED",
 "data": {
 "values": [1073,1800,2299,2176,1899,1400],
 "labels": ["2016-10-19T10:00:00.000Z", "2016-10-19T10:05:00.000Z", "2016-10-19T10:10:00.000Z", "2016-10-19T10:15:00.000Z", "2016-10-19T10:20:00.000Z","2016-10-19T10:25:00.000Z"]
 }
 }
 ];
 let test = TypeSensor(data[0]);
 console.log(typeof test);
 const dat = new Datum(1);
 let val = [23,23,22,21,23,23,23,25,25];
 let lab = ["2016-10-19T08:00:00.000Z", "2016-10-19T09:00:00.000Z", "2016-10-19T10:00:00.000Z",
 "2016-10-19T11:00:00.000Z", "2016-10-19T12:00:00.000Z", "2016-10-19T13:00:00.000Z",
 "2016-10-19T14:00:00.000Z", "2016-10-19T15:00:00.000Z", "2016-10-19T16:00:00.000Z"];
 let lab2=["2016-10-19T10:00:00.000Z", "2016-10-19T10:05:00.000Z", "2016-10-19T10:10:00.000Z",
 "2016-10-19T10:15:00.000Z", "2016-10-19T10:20:00.000Z","2016-10-19T10:25:00.000Z"]

 const testTimeSeries = new TimeSeries(val,lab)

 console.log(SensorType.HUMIDITY);
 console.log(dat.value);
 dat.value=3;

 console.log('TimeSeries');
 console.log(testTimeSeries.values);
 console.log(testTimeSeries.labels[1]);
 testTimeSeries.values=[23,23,22];
 testTimeSeries.labels=lab2;
 console.log('ok', testTimeSeries.toString());
 */