module.exports.notification = async (req, res) => {
  try {
    let message = req.query.message || "";
    let description = req.query.description || "";    

    if (req.query.status) {
      var status = "The operation was successful";
      var colorStatus = "#690";
    } else {
      var status = "ERROR";
      var colorStatus = "#fb3e44";
    }

    let backgroundStyle = ` 
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(241, 241, 241, 0.521);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
      "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    `;

    let backgrounNotificationStyle = `
      min-width: 300px;
      max-width: 600px;
      padding: 20px;      
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: relative;
      top: -80px;
      background-color: white;
      outline: 1px solid #ebedee;
      outline-offset: -10px;
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
      border-radius: 2px;
    `;
    let statusStyle = `
      color: ${colorStatus};
      font-size: 22px;
      padding: 10px;
    `;

    let messageStyle = `
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 10px;`;
    let descriptionStyle = `
      font-size: 14px;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 10px;`;
    let html = `
    <div style = '${backgroundStyle}'>
      <div style = '${backgrounNotificationStyle}'>
        <div style = '${statusStyle}'>
          ${status}
          </div>
        <div style = '${messageStyle}'>
          ${message}
        </div>
        <div style = '${descriptionStyle}'>
          ${description}
        </div>
      </div>
    </div>
    `;
    res.send(html);
  } catch (e) {
    res.sendStatus(500);
  }
};