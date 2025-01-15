const FixedButton = () => {
  return (
    <a 
      href="https://divetobada.com" 
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-5 right-5 
        w-[150px] h-[45px] 
        bg-[#333333] 
        
        rounded-lg
        shadow-md 
        flex items-center justify-center 
        gap-2
        text-white
        hover:shadow-lg
        hover:-translate-y-0.5
        transition-all duration-200
        z-50
      "
    >
      <img 
        src="src/imgs/bada-logo-button.png" 
        alt="Dive to Bada" 
        className="w-8 h-8 object-contain mr-4"
      />
      <span className="text-md font-semibold">with Bada</span>
    </a>
  );
};

export default FixedButton; 