import React, { useState } from "react";
import { Button, Typography, Modal, Box, Grid } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import {FaTiktok} from "react-icons/fa";
import FacebookIcon from "@mui/icons-material/Facebook";

const SharePopup = ({ postUrl, open, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);

  const customButtonStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px",
    border: "1px solid transparent",
    borderRadius: "8px",
    color: "white",
    width: "100%",
    height: "100%",
    transition: "border 0.3s",
    marginTop: "10px",
    "&:hover": {
      border: "2px solid white",
    },
  };

  const copyLinkButtonStyle = {
    marginTop: "3rem",
    width: "100%",
    height: "100%",
    color: "white",
    "&:hover": {
      border: "2px solid white",
    },
  };

const headingStyle={
  color: "white",
}

  const copyLink = {
    marginTop: "3rem",
  };

  const shareViaWhatsApp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(postUrl)}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  const shareViaTelegram = () => {
         const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(postUrl)}`;
        window.open(telegramUrl, "_blank");
    onClose();
  };

  const shareViaInstagram = () => {
    const username = "username";
    const instagramUrl = `https://www.instagram.com/${username}/`;
    window.open(instagramUrl, "_blank");
    onClose();
  };

    const shareViaFacebook = () => {
      const facebookUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(postUrl);
    window.open(facebookUrl, "_blank");
      onClose();
    };

  const shareViaTwitter = () => {
    const text = "Check out this post!";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(postUrl)}`;
    window.open(twitterUrl, "_blank");
    onClose();
  };
  const shareViaTikTok = () => {
    const tiktokUrl = "https://www.tiktok.com/";
    window.open(tiktokUrl, "_blank");
    onClose();
  };



  const handleCopy = () => {
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
      onClose();
    }, 2000);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#1A1A1A',
        p: 2,
        minWidth: 300,
        minHeight: 400,
        textAlign: 'center',
      }}>

        <Typography variant="h2"  sx={headingStyle}>Share Options</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Button onClick={shareViaWhatsApp} sx={customButtonStyle}>
              <WhatsAppIcon />
              <Typography>WhatsApp</Typography>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button onClick={shareViaTelegram} sx={customButtonStyle}>
              <TelegramIcon />
              <Typography>Telegram</Typography>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button onClick={shareViaInstagram} sx={customButtonStyle}>
              <InstagramIcon />
              <Typography>Instagram</Typography>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button onClick={shareViaFacebook} sx={customButtonStyle}>
              <FacebookIcon />
              <Typography>Facebook</Typography>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button onClick={shareViaTwitter} sx={customButtonStyle}>
              <TwitterIcon />
              <Typography>Twitter</Typography>
            </Button>
          </Grid>

          <Grid item xs={4}>
            <Button onClick={shareViaTikTok} sx={customButtonStyle}>
              <FaTiktok />
              <Typography>TikTok</Typography>
            </Button>
          </Grid>

        </Grid>
        <CopyToClipboard text={postUrl} onCopy={handleCopy}>
          <Button  sx={copyLinkButtonStyle}>
            Copy Link
          </Button>
        </CopyToClipboard>
        {isCopied && (
          <Typography variant="body2" color="green" sx={copyLink}>
            Link copied!
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default SharePopup;
