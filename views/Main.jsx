const React = require('react');
const Layout = require('./Layout');

module.exports = function Main({ signText }) {
  return (
    <Layout>
      <div className="container">

        <section className="sidebar">
          <h1>Call a Cheer</h1>

          <form id="cheer_caller" action="/cheers" method="post">
            <label htmlFor="text">
              Cheer name:
              <input type="text" name="cheer_name" />
            </label>
            <input type="submit" value="Call it out!" />
          </form>
        </section>

        <main className="mascot">
          <div className="sign-text-wrap">
            <div className="sign-text">

              {signText && <span>{signText}</span>}

            </div>
          </div>
        </main>
      </div>

    </Layout>
  );
};
