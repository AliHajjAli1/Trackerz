import { FiX } from "react-icons/fi";
import { Snackbar } from "@mui/material";

interface SnackProps{
    open: boolean;
    text: string;
    setSnackOpen: (open: boolean) => void;
}

export const Snack: React.FC<SnackProps> = ({open, text, setSnackOpen}) => {
    return (
        <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={() => setSnackOpen(false)}
        message={
          <span style={{ color: "#fff" }}>{text}</span>
        }
        ContentProps={{
          sx: { backgroundColor: "rgb(9, 130, 54)" },
        }}
        action={
          <FiX
            className="text-white cursor-pointer"
            onClick={() => setSnackOpen(false)}
          />
        }
      />
    );
}