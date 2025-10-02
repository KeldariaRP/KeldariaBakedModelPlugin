(function() {
  
  function compactArrays(jsonString) {
    return jsonString.replace(
      /\[\s*([\d.\-eE]+|true|false|null)(,\s*([\d.\-eE]+|true|false|null))*\s*\]/g,
      (match) => match.replace(/\s+/g, ' ').replace(/\n/g, '')
    );
  }

  BBPlugin.register('keldaria_format', {
    title: "Keldaria BakedModel Format",
    author: "Nathanaelle2611",
    description: "Models pour Keldaria",
    onload() {
      
      /*Texture.prototype.menu.addAction(new Action("test", {
        name: "Test",
        description: "Test2"

      }), "#properties");*/

      const format = new ModelFormat('keldaria_baked', {
        name: "Keldaria Baked",
        show_on_start_screen: true,
        cullfaces: true,
        box_uv: false,
        texture_folder: true,
        single_texture: false,
        per_texture_uv_size: true,
        model_identifier: false,
        rotate_cubes: true,
        rotation_limit: false,
        uv_rotation: true,
        java_face_properties: true,
        java_cube_shading_properties: true,
        parent_model_id: true,
        icon: 'cube',
        onStart() {
          
        },
        codec: new Codec('keldaria_baked_codec', {
          name: "Keldaria Baked Codec",
          extension: "json",
          compile(options) {
            var model = {};

            var textures = {};

            var uuid_to_id_textures = {};

            var parts = [];

            Project.textures.forEach(tex => {
              textures[tex.id] = tex.name;
              uuid_to_id_textures[tex.uuid] = tex.id;
            });

            Outliner.elements.forEach(cube => {
            
              var faces = {};

              for (const [faceKey, faceValue] of Object.entries(cube.faces))
              {
                if (faceValue.texture !== null)
                {
                  faceObj = faces[faceKey] = {
                    uv: faceValue.uv,
                    texture: "#" + uuid_to_id_textures[faceValue.texture]
                  };
                  if (faceValue.rotation != 0)
                    faceObj.rotation = faceValue.rotation;
                  if (faceValue.tint != -1)
                    faceObj.tint_index = faceValue.tint;
                    
                }
              }
              var part = {
                from: cube.from,
                to: cube.to,
                pivot_point: cube.origin,
                rotation: cube.rotation,
                faces: faces
              };
              parts.push(part);
            })
            model.texture_size = [Project.texture_width,  Project.texture_height]
            model.textures = textures;
            model.parts = parts;
            return compactArrays(JSON.stringify(model, null, 2));
          }
        })
      })
    }
  })


})();

