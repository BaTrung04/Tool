import { Box, Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import services from "../../../services";

interface DialogInfoVideoProps {
  open: boolean;
  onClose: () => void;
  id: string;
}

interface Author {
  avatar?: string;
  nickname?: string;
  username?: string;
}

interface dataInfo {
  author?: Author;
  playAddr?: string;
  create_time?: string;
  desc?: string;
}

const DialogInfoVideo = ({ open, onClose, id }: DialogInfoVideoProps) => {
  const [data, setData] = useState<dataInfo>({});
  const fetchInfoVideo = useCallback(async () => {
    try {
      const params = {
        q: id,
      };
      const res = await services.download.getInfo(params);
      if (res.data) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchInfoVideo();
  }, [fetchInfoVideo]);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <span className="font-bold text-[26px]"> Thông tin Video</span>
      </DialogTitle>
      <DialogContent>
        <Box className="grid grid-cols-12 mb-2">
          <Box className="col-span-3">
            <img
              src={data?.author?.avatar}
              alt={data?.author?.nickname || "avatar"}
              className="min-w-[200px], min-h-[200px]"
            />
            <Box>
              <Box>
                Tên người dùng: {data?.author?.nickname ?? "Trần hà linh"}
              </Box>
              <Box>Tài khoản: {data?.author?.username ?? "HALINH232"}</Box>
            </Box>
          </Box>
          <Box className="col-span-9">
            <Box>Thời gian tạo: {data?.create_time ?? "18-05-2025"}</Box>
            <Box>
              Mô tả:{" "}
              {data?.desc ??
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio molestiae, ducimus cumque repellat praesentium excepturi recusandae eveniet hic, ullam id doloremque tempora quas voluptates nobis nulla sapiente, explicabo voluptatum nostrum."}
            </Box>
          </Box>
        </Box>
        <Box className="flex items-center justify-center mb-2">
          <video
            controls
            // src={`${data.playAddr}`}
            autoPlay
            src={`https://v16-webapp-prime.tiktok.com/video/tos/alisg/tos-alisg-pve-0037c001/oQIEWFoHuBC6BjDREf2nTUQgEl5WUFe7Y0QARU/?a=1988&bti=bGRuZHxvMXIxcm53Zm1cYF9ebWFzaHFmOg%3D%3D&ch=0&cr=0&dr=0&er=0&cd=0%7C0%7C0%7C0&cv=1&br=3062&bt=1531&cs=2&ds=4&eid=16384&ft=z5C3aPWT2eHjV8yttMgfuUA5roM5SivIU0N7TGbL&mime_type=video_mp4&qs=15&rc=ZzU4aWhoNWc0Zzw8NDk6PEBpM3Rnb3g5cmhoMzMzODczNEBeMV8zNTIwNTQxL2I2NWA2YSNeZWgwMmRzNV9hLS1kMTFzcw%3D%3D&btag=e000b0000&expire=1747573338&l=202505181502065E8F8197CE7810E1A9E9&ply_type=2&policy=2&signature=2ea2fb03867d9ab5a42da01372d346e6&tk=tt_chain_token`}
            style={{ width: "90%", height: "90%", objectFit: "cover" }}
          >
            <track kind="captions" />
          </video>
        </Box>
        <Box className="flex items-center justify-end ">
          <Button type="submit" variant="contained">
            Đóng
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DialogInfoVideo;
