import { Button } from "@mui/material";
const NavgationButton: React.FC = () => {
  const categories = ["gaming", "art", "pfps", "more"];
  const icons = ["🔥", "🎨", "🎮", "💎", "⚡", "🛠️"];

  return (
    <div className="w-[92%] h-[50px] flex flex-row items-center justify-between gap-[20px] ml-[40px]">
      <div className="md:gap-[10px] flex flex-row gap-[5px]">
        <Button
          size="small"
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "gray",
            backgroundColor: "#101011",
          }}
        >
          All
        </Button>
        <div className="flex flex-row gap-[10px] hidden sm:flex">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant="outlined"
              sx={{
                color: "#ACADAE",
                borderColor: "gray",
                backgroundColor: "#101011",
              }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}{" "}
              {/*
                onClick={() => navigate(`/category/${cat}`)}*/}
            </Button>
          ))}
        </div>
      </div>
      <div className="gap-[7px] flex flex-row w-[10%] justify-end">
        <Button
          size="small"
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "gray",
            backgroundColor: "#101011",
            marginRight: { xs: "35px", md: "10px" },
          }}
        >
          All
        </Button>
        <div className=" flex-row gap-[10px] hidden xl:flex">
          {icons.map((icon: any) => (
            <Button
              key={icon}
              size="small"
              variant="outlined"
              sx={{
                color: "#ACADAE",
                borderColor: "gray",
                backgroundColor: "#101011",
              }}
            >
              {icon}{" "}
              {/*
                onClick={() => navigate(`/category/${cat}`)}*/}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default NavgationButton;
