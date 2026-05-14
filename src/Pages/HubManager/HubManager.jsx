import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  RiUserAddLine,
  RiMailLine,
  RiMapPinUserLine,
  RiDeleteBin6Line,
  RiSettings3Line,
  RiCloseLine,
} from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router"; // ডাটা লোড করার জন্য
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const HubManager = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- ডাটা লোড (Rider Registration এর মতই) ---
  const areaAndLocation = useLoaderData() || [];
  const clearRegions = [...new Set(areaAndLocation.map((rg) => rg.region))];

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  // Watch selected values for dependent dropdowns
  const selectedRegion = useWatch({ control, name: "region" });
  const selectedDistrict = useWatch({ control, name: "district" });

  // Reset dependent fields when parent changes
  useEffect(() => {
    setValue("district", "");
    setValue("hubName", "");
  }, [selectedRegion, setValue]);

  useEffect(() => {
    setValue("hubName", "");
  }, [selectedDistrict, setValue]);

  // Helper functions for filtering
  const getDistricts = (region) => {
    if (!region) return [];
    return areaAndLocation
      .filter((item) => item.region === region)
      .map((d) => d.district);
  };

  const getHubs = (district) => {
    if (!district) return [];
    const findDistrict = areaAndLocation.find(
      (item) => item.district === district
    );
    return findDistrict?.covered_area || [];
  };

  
  const { data: managers = [], refetch: refetchManagers } = useQuery({
    queryKey: ["users", "hub-managers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/hub-managers");
      return res.data;
    },
  });

  const { data: normalUsers = [], refetch: refetchNormalUsers } = useQuery({
    queryKey: ["users", "normal-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=user");
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch("/users/make-hub-manager", data);
      if (res.data.success) {
        Swal.fire({
          title: "Success!",
          text: "New Hub Manager assigned successfully.",
          icon: "success",
          timer: 2000,
        });
        setIsModalOpen(false);
        reset();
        refetchManagers();
        refetchNormalUsers();
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to assign role", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This manager will be removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Remove",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/users/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Manager has been removed.", "success");
            refetchManagers();
          }
        } catch (error) {
          Swal.fire("Error", "Failed to delete manager", "error");
        }
      }
    });
  };

  return (
    <div className="animate-fadeIn relative">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-black text-slate-800">Hub Administration</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
            Managing {managers.length} Hub Managers
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#002B36] text-[#CAEB66] px-5 py-2.5 rounded-2xl text-xs font-black hover:shadow-lg transition-all active:scale-95"
        >
          <RiUserAddLine size={18} />
          ADD NEW MANAGER
        </button>
      </div>

      {/* Managers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managers.map((manager) => (
          <div
            key={manager._id}
            className="bg-white border border-gray-100 p-6 rounded-[30px] shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100">
                {manager.photoURL ? (
                  <img src={manager.photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  <RiMapPinUserLine size={28} className="text-gray-300" />
                )}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg" onClick={() => handleDelete(manager._id)}>
                  <RiDeleteBin6Line size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-black text-slate-700 text-base">{manager.displayName || manager.name}</h3>
                <div className="flex items-center gap-1.5 text-gray-400 mt-1">
                  <RiMailLine size={14} />
                  <span className="text-[11px] font-medium">{manager.email}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-dashed border-gray-100 flex justify-between items-center">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">
                    Assigned Hub & District
                  </p>
                  <p className="text-xs font-bold text-slate-600">
                    {manager.hubName || "N/A"} ({manager.district || "N/A"})
                  </p>
                </div>
                <span className="bg-lime-50 text-lime-600 px-3 py-1 rounded-full text-[9px] font-black uppercase">Active</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD MANAGER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl scale-in-center">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-800">Assign Hub Manager</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <RiCloseLine size={24} className="text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* User Selection */}
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Select User</label>
                <select
                  {...register("email", { required: "User selection is required" })}
                  className="w-full mt-1 px-4 py-3 bg-gray-50 border-none rounded-2xl text-xs font-bold text-slate-700 focus:ring-2 focus:ring-[#CAEB66]"
                >
                  <option value="">Choose a normal user</option>
                  {normalUsers.map((user) => (
                    <option key={user._id} value={user.email}>
                      {user.displayName || user.name} ({user.email})
                    </option>
                  ))}
                </select>
                {errors.email && <p className="text-red-500 text-[9px] mt-1 ml-2">{errors.email.message}</p>}
              </div>

              {/* Region Selection */}
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Region</label>
                <select
                  {...register("region", { required: "Region is required" })}
                  className="w-full mt-1 px-4 py-3 bg-gray-50 border-none rounded-2xl text-xs font-bold text-slate-700 focus:ring-2 focus:ring-[#CAEB66]"
                >
                  <option value="">Select Region</option>
                  {clearRegions.map((region, i) => (
                    <option key={i} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* District Selection */}
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">District</label>
                <select
                  {...register("district", { required: "District is required" })}
                  disabled={!selectedRegion}
                  className="w-full mt-1 px-4 py-3 bg-gray-50 border-none rounded-2xl text-xs font-bold text-slate-700 focus:ring-2 focus:ring-[#CAEB66] disabled:opacity-50"
                >
                  <option value="">Select District</option>
                  {getDistricts(selectedRegion).map((district, i) => (
                    <option key={i} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              {/* Hub Name Selection (Old Area logic) */}
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Hub Name (Area)</label>
                <select
                  {...register("hubName", { required: "Hub Name is required" })}
                  disabled={!selectedDistrict}
                  className="w-full mt-1 px-4 py-3 bg-gray-50 border-none rounded-2xl text-xs font-bold text-slate-700 focus:ring-2 focus:ring-[#CAEB66] disabled:opacity-50"
                >
                  <option value="">Select Hub/Area</option>
                  {getHubs(selectedDistrict).map((hub, i) => (
                    <option key={i} value={hub}>{hub}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#CAEB66] text-[#002B36] rounded-2xl text-xs font-black uppercase tracking-widest mt-4 hover:shadow-lg active:scale-95 transition-all"
              >
                Assign Role & Hub
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HubManager;