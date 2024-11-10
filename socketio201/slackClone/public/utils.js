const buildMessageHTML = ({ text, date, username }) => {
  const dateObj = new Date(date);
  const time = dateObj.toLocaleTimeString();
  return `
    <li>
      <div class="user-message">
        <div class="user-name-time">${username} <span>${time}</span></div>
        <div class="message-text">${text}</div>
      </div>
    </li>
  `
};