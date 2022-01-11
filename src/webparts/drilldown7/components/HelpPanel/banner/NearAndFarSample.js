 /**
  * Samples were copied from ExStorage.tsx
  */

  /*
  private nearBannerElements = this.buildNearBannerElements();
  private farBannerElements = this.buildFarBannerElements();

  private buildNearBannerElements() {
    let elements: any[] = [<div style={{ padding: '10px 20px 10px 0px' }} className={ '' }>
      <Image 
        className={ null } 
        src={ 'https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc4NjAzMjUxMjYyNzkz/gettyimages-485691273-2.jpg' } 
        shouldFadeIn={true} 
        imageFit={ ImageFit.centerContain }
        coverStyle={ ImageCoverStyle.landscape }      
        width={ 60 } height={ 20 }
    /></div>];

    return elements;
  }

  private buildFarBannerElements() {
    let elements: any[] = [
      <div className = { null } style={{width: null, cursor: 'pointer', position: 'relative' }}
        title={ `ID:  ${ 'abc' } See all Item Details.` }>
        <div style={{ position: 'relative' }} onClick={ this._onClickSample.bind(this)} id={ 'id=Test' } data-callback = { 'search-callback' }>{ fpsAppIcons.ImageSearchBlack }</div>
      </div>

    ];

    let returnElement = [
    <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'start'}}>
      { [...elements,...elements,...elements,...elements,...elements,] }
    </div>];

    return returnElement;
  }

  private _onClickSample( event ) {
    // console.log( '_onClickType:',  event );
    let textCallback = event.currentTarget.dataset.callback;
    alert('textCallback: ' +  textCallback );
  }

  */