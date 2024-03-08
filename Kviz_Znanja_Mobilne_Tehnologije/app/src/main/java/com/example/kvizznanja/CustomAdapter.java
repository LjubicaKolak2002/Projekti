package com.example.kvizznanja;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class CustomAdapter extends RecyclerView.Adapter<CustomAdapter.CustomViewHolder> {

    private List<Result> dataList;
    private Context context;
    public CustomAdapter(Context context, List<Result> dataList ){
        this.context = context;
        this.dataList = dataList;
    }

    class CustomViewHolder extends RecyclerView.ViewHolder {

        public final View mView;
        TextView date, percentage, index, seconds;

        CustomViewHolder(View itemView) {
            super(itemView);
            mView = itemView;
            index = mView.findViewById(R.id.textViewRank2);
            date = mView.findViewById(R.id.textViewDate);
            percentage = mView.findViewById(R.id.textViewPercentage);
            seconds = mView.findViewById(R.id.textViewMySeconds);
        }
    }

    @Override
    public CustomViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View view = layoutInflater.inflate(R.layout.user_results_view_holder, parent, false);
        return new CustomViewHolder(view);
    }
    public void setDataList(List<Result> newDataList) {
        this.dataList = newDataList;
        notifyDataSetChanged();
    }

    @Override
    public void onBindViewHolder(CustomViewHolder holder, int position) {
        Result currentResult = dataList.get(position);
        holder.index.setText(String.valueOf(position + 1) + ".");
        holder.date.setText(String.valueOf(currentResult.getDatum()));
        holder.seconds.setText(String.valueOf(currentResult.getSekunde()) + "s");
        holder.percentage.setText(String.valueOf(currentResult.getPostotak()) + "%");
    }

    @Override
    public int getItemCount() {
        return dataList.size();
    }

}