using System.Collections;
using System.Globalization;
using System.Numerics;
using System.Reflection;
using MedApp.Extensions;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace MedApp.Api;

public static class JsonConverterSettings
{
    public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings()
    {
        MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
        DateParseHandling = DateParseHandling.None,
        NullValueHandling = NullValueHandling.Ignore,
        DefaultValueHandling = DefaultValueHandling.Ignore,
        ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
        ContractResolver = ShouldSerializeContractResolver.Singleton,
        Converters =
        {
            StringToBoolConverter.Singleton,
            new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
        },
    };
}

internal class ShouldSerializeContractResolver : DefaultContractResolver
{
    public static readonly ShouldSerializeContractResolver Singleton = new ShouldSerializeContractResolver();

    protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
    {
        var property = base.CreateProperty(member, memberSerialization);

        if (property == null || property.PropertyType == null)
            return property;

        if (property.PropertyType == typeof(string))
            property.ShouldSerialize = instance =>
            {
                var prop = instance?.GetType().GetProperty(property.PropertyName.CapitalizeFirstLetter());
                if (prop == null)
                    return true;
                    
                var val = prop?.GetValue(instance) as string;
                return !string.IsNullOrWhiteSpace(val);
            };

        else if (property.PropertyType == typeof(BigInteger))
            property.ShouldSerialize = instance =>
            {
                var prop = instance?.GetType().GetProperty(property.PropertyName.CapitalizeFirstLetter());
                if (prop == null)
                    return true;
                    
                var val = prop?.GetValue(instance) is BigInteger ? (BigInteger)prop?.GetValue(instance) : default;
                return val != default;
            };

        else if (property.PropertyType == typeof(int))
            property.ShouldSerialize = instance =>
            {
                var prop = instance?.GetType().GetProperty(property.PropertyName.CapitalizeFirstLetter());
                if (prop == null)
                    return true;
                var val = prop?.GetValue(instance) is int ? (int)prop?.GetValue(instance) : default;
                return val != default;
            };

        else if (property.PropertyType == typeof(float))
            property.ShouldSerialize = instance =>
            {
                var prop = instance?.GetType().GetProperty(property.PropertyName.CapitalizeFirstLetter());
                if (prop == null)
                    return true;
                var val = prop?.GetValue(instance) is float ? (float)prop?.GetValue(instance) : default;
                return val != default;
            };

        else if (property.PropertyType == typeof(double))
            property.ShouldSerialize = instance =>
            {
                var prop = instance?.GetType().GetProperty(property.PropertyName.CapitalizeFirstLetter());
                if (prop == null)
                    return true;
                var val = prop?.GetValue(instance) is double ? (double)prop?.GetValue(instance) : default;
                return val != default;
            };

        else if (property.PropertyType.GetInterface(nameof(IEnumerable)) != null)
            property.ShouldSerialize = instance =>
            {
                var prop = instance?.GetType().GetProperty(property.PropertyName.CapitalizeFirstLetter());
                if (prop == null)
                    return true;
                var val = prop?.GetValue(instance) as IEnumerable<object>;
                return !val.IsNullOrEmpty();
            };

        return property;
    }
}

internal class StringToBoolConverter : JsonConverter
{
    public override bool CanConvert(Type t) => t == typeof(bool) || t == typeof(bool?);

    public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
    {
        if (reader.TokenType == JsonToken.Null)
            return null;

        var value = serializer.Deserialize<string>(reader);

        return bool.TryParse(value, out var b) && b;
    }

    public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
    {
        if (untypedValue == null)
        {
            serializer.Serialize(writer, null);
            return;
        }

        var boolString = (bool)untypedValue ? "true" : "false";
        serializer.Serialize(writer, boolString);
    }

    public static readonly StringToBoolConverter Singleton = new StringToBoolConverter();
}