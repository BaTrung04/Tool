import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Icon } from "@iconify/react";
import services from "../../../services";
import { toast } from "react-toastify";
import DialogInfoVideo from "../Dialog/DialogInfoVideo";

interface HomeProps {
  type: string;
}

const Home: React.FC<HomeProps> = ({ type }) => {
  const [link, setLink] = useState("");
  const [selectionModel, setSelectionModel] = useState<(number | string)[]>([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [data, setData] = useState([]);
  const [show, setShow] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [paramSearch, setParamSearch] = useState<{
    search: string | null;
    fromDate: string | null;
    toDate: string | null;
  }>({
    search: null,
    fromDate: null,
    toDate: null,
  });
  
  const [totalPage, setTotalPage] = useState(1);

  const handleSearch = async () => {
    if (link == "") {
      return;
    }
    const params = {
      q: link,
      limit: paginationModel.pageSize,
      type: type,
      // ...Object.fromEntries(
      //   Object.entries(paramSearch).filter(
      //     ([_, value]) => value !== null && value !== ""
      //   )
      // ),
    };

    try {
      const res = await services.download.getUser(params);
      setData(res?.data);
      setTotalPage(res?.data?.length);
      toast.success(res?.message);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilter = () => {};

  const handleUp = (params: any) => {
    console.log(params);
  };
  const handleInfo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShow(true);
    setSelectedId(id);
  };

  const handleDowloadAll = async () => {
    try {
      const res = await services.download.postAll();
      if (res.status_code === 200) {
        toast.success(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "id", headerName: "STT", width: 70 },
    { field: "name", headerName: "Tên video", flex: 1 },
    { field: "info", headerName: "Thông tin ", flex: 1 },
    { field: "link", headerName: "Link(URL)", flex: 2 },
    {
      field: "action",
      headerName: "Thao tác",
      width: 200,
      renderCell: (params: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Tooltip title="Thông tin chi tiết video">
            <IconButton
              size="small"
              sx={{ color: "text.secondary" }}
              onClick={(e) => {
                handleInfo(params?.row?.id, e);
              }}
            >
              <Icon
                icon="material-symbols:info-outline"
                width="24"
                height="24"
              />{" "}
            </IconButton>
          </Tooltip>
          <Tooltip title="tải một video">
            <IconButton
              size="small"
              sx={{ color: "text.secondary" }}
              onClick={(e) => {
                e.stopPropagation();
                handleUp(params);
              }}
            >
              <Icon icon="material-symbols:download-rounded" />
            </IconButton>
          </Tooltip>
          <Tooltip title="tải all">
            <IconButton
              size="small"
              sx={{ color: "text.secondary" }}
              onClick={(e) => {
                e.stopPropagation();
                handleDowloadAll();
              }}
            >
              <Icon icon="material-symbols:cloud-download-outline" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const rows = [
    { id: 1, name: "video 1", link: "https://figma.douyin.tiktok/video1" },
    { id: 2, name: "video 2", link: "https://figma.douyin.tiktok/video2" },
    { id: 3, name: "video 3", link: "https://figma.douyin.tiktok/video3" },
    { id: 4, name: "video 4", link: "https://figma.douyin.tiktok/video4" },
    { id: 5, name: "video 5", link: "https://figma.douyin.tiktok/video5" },
  ];

  return (
    <section className="section-content">
      <div className="flex flex-col gap-3 my-12">
        <Typography variant="h4" className="text-center font-semibold mb-1">
          Tải xuống video Tiktok (Douyin)
        </Typography>
        <Typography className="text-center text-gray-600 mb-6">
          Không có Logo, Chất lượng cao
        </Typography>

        <Box className="flex justify-center mb-6 space-x-2 ">
          <TextField
            fullWidth
            placeholder="Nhập Link vào đây"
            variant="outlined"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="max-w-xl "
            size="small"
          />
          <Button
            onClick={handleSearch}
            variant="contained"
            className="bg-green-400 text-black normal-case hover:bg-green-300 "
          >
            Search
          </Button>
        </Box>
      </div>

      <Box className="flex items-center mb-6 space-x-2">
        <Typography>Từ ngày</Typography>
        <TextField
          type="date"
          variant="outlined"
          value={paramSearch.fromDate || ""}
          size="small"
          onChange={(e) =>
            setParamSearch({ ...paramSearch, fromDate: e.target.value })
          }
        />
        <Typography>Đến ngày</Typography>
        <TextField
          type="date"
          variant="outlined"
          value={paramSearch.toDate || ""}
          onChange={(e) =>
            setParamSearch({ ...paramSearch, toDate: e.target.value })
          }
          className="w-40"
          size="small"
        />
        <Button
          onClick={handleFilter}
          variant="contained"
          className="bg-gray-200 text-black normal-case hover:bg-gray-300"
        >
          Bộ lọc
        </Button>
      </Box>

      <DataGrid
        // rows = {data}
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          setSelectionModel(newSelection as unknown as (number | string)[]);
        }}
        paginationMode="server"
        rowCount={totalPage}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        localeText={{
          noRowsLabel: "Không có dữ liệu.",
        }}
      />
      <Box className="flex justify-end mt-6">
        <Button
          variant="contained"
          className="normal-case bg-gray-200 text-black hover:bg-gray-300"
          onClick={() => handleDowloadAll()}
        >
          Tải tất cả
        </Button>
      </Box>
      {/* <ConfirmDialog
        open={openConfirm}
        title="Xóa bản ghi"
        message="Bạn chắc chắn muốn xóa bản ghi này?"
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() => {
          // Xử lý xóa
          setOpenConfirm(false);
        }}
      /> */}
      <DialogInfoVideo
        open={show}
        onClose={() => setShow(false)}
        id={selectedId}
      />
    </section>
  );
};

export default Home;
