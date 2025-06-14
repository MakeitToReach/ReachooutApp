"use client";
import { createTemplateCategory } from "@/api/admin";
import { getCategoriesByTemplateId } from "@/api/templates";
import { ReqInput } from "@/components/editor-components/inputs/reqInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from "next/dist/client/components/navigation";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const TemplatePage = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const searchParams = useSearchParams();
  const name = searchParams?.get("name");

  const [formData, setFormData] = useState({
    category: "",
    data: "",
  });
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id || formData.category === "" || formData.data === "") {
        toast.error("All fields are required");
        return;
      }
      await createTemplateCategory(id, formData.category, formData.data);
    } catch (error) {
      console.error("Error creating template:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      if (!id) return;
      const response = await getCategoriesByTemplateId(id);
      setCategories(response.categories);
    };

    fetchCategories();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="capitalize text-3xl">{name} Template Settings</h1>
      {/* all categories list */}
      <Card>
        <CardHeader className="text-xl">All Categories</CardHeader>
        <CardContent>
          {categories.length > 0 ? (
            <>
              {categories.map((category: { id: string; category: string }) => (
                <ul key={category.id} className="space-y-2 ml-2 list-disc">
                  <li>{category.category}</li>
                  {/* <code>{category.data}</code> */}
                </ul>
              ))}
            </>
          ) : (
            <p>No categories found</p>
          )}
        </CardContent>
      </Card>

      {/* create template category form */}
      <Card>
        <CardHeader className="text-xl">Create Template Category</CardHeader>
        <CardContent>
          <form method="post" className="space-y-4">
            <ReqInput
              label="Category Name"
              name="category"
              placeholder="Enter category name"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
            <div className="space-y-2">
              <Label>Category Data</Label>
              <Textarea
                name="data"
                required
                placeholder="Enter only JSON data"
                className={`min-h-[200px] text-sm`}
                value={formData.data}
                onChange={(e) =>
                  setFormData({ ...formData, data: e.target.value })
                }
              />
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplatePage;
