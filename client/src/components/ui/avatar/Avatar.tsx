import "./avatar.css";

const Avatar = () => {
  const various = ["Pepper", "Milo", "Casper", "Boo", "Sophie", "Sadie", "Buddy", "Bear", "Rocky", "Shadow", "Smokey"];
  const randomIndex = Math.floor(Math.random() * various.length);
  return (
    <img
      className="avatar"
      src={`https://api.dicebear.com/8.x/pixel-art/svg?seed=${various[randomIndex]}`}
      alt={`${various[randomIndex]} avatar`}
    />
  );
};

export default Avatar;
