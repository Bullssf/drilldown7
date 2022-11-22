
## Usage

## WebPartProperties:
import { IAgeSliderWPProps } from './components/AgeSlider/ageTypes';

## Main Webpart
import { buildAgeSliderGroup } from './components/AgeSlider/AgePropPaneGroup';

### Add prop pane group
  buildAgeSliderGroup( this.properties ),

### In create element
      ageSliderWPProps: {
        AgeIsVisible: this.properties.AgeIsVisible,
        AgeColumnName: this.properties.AgeColumnName,
        AgeColumnTitle: this.properties.AgeColumnTitle,
        AgeDefault: this.properties.AgeDefault, //Should be index of AgeSliderOption
      }

## List Interface
  ageColumns: string[];
  ageColumnsStr: string;

## In Defining List Object

  ageColumns: [ 'Created', 'Modified', ],

  if ( AgeColumnName ) list.ageColumns.push( AgeColumnName );


  // Added this for AgeSlider
  list.ageColumns.map( column => {
    if ( allColumns.indexOf( column ) === -1 ) allColumns.push( column )
  });

  list.ageColumnsStr = list.ageColumns.join(',');


## In Fetch/Process data
    drillList.ageColumns.map( column => {
      if ( item[ `${column}` ] ) item[ `time${column}` ] = makeTheTimeObject(item[ column ]);
    });


## Where used Component
```typescript

  import AgeSliderHook from '../AgeSlider/ageHook';

  function render() => {

    const SliderProps: IAgeSliderProps = { ...{this.props.ageSliderProps}, ...{ onChange: ( value: number ) => this._updateAgeSlider( value) }}
    return ( 
      <AgeSliderHook
        props: SliderProps, // IAgeSliderProps
      />
    );
  }


```