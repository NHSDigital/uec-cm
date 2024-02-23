import React from 'react';

function TestPage() {
  return (
    <div className="App">
      <header className="App-header">
        <h6 style={{color: 'red', fontSize:'5px'}}>Breaking Accessibility Rules</h6>
        <img src="logo.svg" alt="" />
        <p>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" onClick={(e) => e.preventDefault()} style={{color: 'green'}}>Click Here</a>
        </p>
        <form>
          <input type="text" style={{borderColor: 'lightgrey'}} />
          <button type="submit" style={{backgroundColor: 'grey', color: 'darkgrey'}}>Submit</button>
        </form>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div tabIndex={0} style={{outline: 'none'}}>Focusable Div with No Focus Indicator</div>
      </header>
    </div>
  );
}

export default TestPage;
