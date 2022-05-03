export default function Commands(props) {
  const translate = props.language

  return (
    <section className="home-commands" id="commands">
      <div className="container">
        <div className="home-commands-header">
          <small>COMMANDS</small>
          <h2>{translate.pages.home.commands_notable_command}</h2>
          <p dangerouslySetInnerHTML={{__html: translate.pages.home.commands_notable_command_description}}></p>
        </div>
        <br />
        <div className="home-commands-content">
          <div className="home-commands-table table-responsive">
            <table className="table table-light table-striped">
              <thead>
                <tr>
                  <th scope="col">{translate.pages.home.commands_table_name}</th>
                  <th scope="col">{translate.pages.home.commands_table_description}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">autoplay</th>
                  <td>{translate.pages.home.commands_autoplay_description}</td>
                </tr>
                <tr>
                  <th scope="row">together</th>
                  <td>{translate.pages.home.commands_together_description}</td>
                </tr>
                <tr>
                  <th scope="row">help</th>
                  <td>{translate.pages.home.commands_help_description}</td>
                </tr>
                <tr>
                  <th scope="row">invite</th>
                  <td>{translate.pages.home.commands_invite_description}</td>
                </tr>
                <tr>
                  <th scope="row">settings</th>
                  <td>{translate.pages.home.commands_settings_description}</td>
                </tr>
                <tr>
                  <th scope="row">ban</th>
                  <td>{translate.pages.home.commands_ban_description}</td>
                </tr>
                <tr>
                  <th scope="row">kick</th>
                  <td>{translate.pages.home.commands_kick_description}</td>
                </tr>
                <tr>
                  <th scope="row">purge</th>
                  <td>{translate.pages.home.commands_purge_description}</td>
                </tr>
                <tr>
                  <th scope="row">unban</th>
                  <td>{translate.pages.home.commands_unban_description}</td>
                </tr>
                <tr>
                  <th scope="row">weather</th>
                  <td>{translate.pages.home.commands_weather_description}</td>
                </tr>
                <tr>
                  <th scope="row">leveling</th>
                  <td>{translate.pages.home.commands_leveling_description}</td>
                </tr>
                <tr>
                  <th scope="row">filter</th>
                  <td>{translate.pages.home.commands_filter_description}</td>
                </tr>
                <tr>
                  <th scope="row">join</th>
                  <td>{translate.pages.home.commands_join_description}</td>
                </tr>
                <tr>
                  <th scope="row">leave</th>
                  <td>{translate.pages.home.commands_join_description}</td>
                </tr>
                <tr>
                  <th scope="row">play</th>
                  <td>{translate.pages.home.commands_play_description}</td>
                </tr>
                <tr>
                  <th scope="row">search</th>
                  <td>{translate.pages.home.commands_search_description}</td>
                </tr>
                <tr>
                  <th scope="row">queue</th>
                  <td>{translate.pages.home.commands_queue_description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
