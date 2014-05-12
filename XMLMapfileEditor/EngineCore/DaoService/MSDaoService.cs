using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

using IBatisNet.DataMapper;
using XMLMapfileEditor.EngineCore.Model;

namespace XMLMapfileEditor.EngineCore.DaoService
{
    public class MSDaoService : AbstractDaoService
    {
        public void Insert(MSObject msObject)
        {
            msObject.Guid = Guid.NewGuid().ToString();
            msObject.LastModifiedTime = DateTime.Now;
            base.GetMapper().Insert("MSObject_DefaultInsert", msObject);
        }
        public void Update(MSObject msObject)
        {
            msObject.LastModifiedTime = DateTime.Now;
            base.GetMapper().Update("MSObject_DefaultUpdate", msObject);
        }
        public MSObject Query(string guid)
        {
            return base.GetMapper().QueryForObject("MSObject_DefaultSelectSingle", new MSObject() { Guid = guid }) as MSObject;
        }
        public IList QueryByTypeAndPID(MSObject msObject)
        {
            string sql = base.GetRuntimeSql(base.GetMapper(),
                "MSObject_DefaultSelectByTypeAndPID",
                msObject);
            return base.GetMapper().QueryForList("MSObject_DefaultSelectByTypeAndPID", msObject) as IList;
        }
        public IList Query(MSObject msObject)
        {
            return base.GetMapper().QueryForList("MSObject_DefaultSelect", msObject) as IList;
        }
        public int Delete(string guid)
        {
            return Convert.ToInt16(base.GetMapper().Delete("MSObject_Delete", guid));
        }
        
    }
}
