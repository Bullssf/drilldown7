
## Usage

```typescript

  import AgeSliderHook from '';

  function render() => {

    const SliderProps: IAgeSliderProps = { ...{this.props.ageSliderProps}, ...{ onChange: ( value: number ) => this._updateAgeSlider( value) }}
    return ( 
      <AgeSliderHook
        props: SliderProps, // IAgeSliderProps
      />
    );
  }




```